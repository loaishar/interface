import React, { createContext, useContext, useState } from 'react';
import { openManusService, mapToolName } from '../services/openManus';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tools?: Array<{
    name: string;
    output?: string;
    status: 'running' | 'completed' | 'error';
  }>;
};

type ExecutionState = {
  status: 'idle' | 'running' | 'completed' | 'error';
  tools: string[];
  currentTool: string | null;
  toolOutput: any;
};

interface ConversationContextType {
  messages: Message[];
  executionState: ExecutionState;
  sendMessage: (content: string) => Promise<void>;
  executeCommand: (command: string) => Promise<void>;
}

const ConversationContext = createContext<ConversationContextType>({
  messages: [],
  executionState: { status: 'idle', tools: [], currentTool: null, toolOutput: null },
  sendMessage: async () => {},
  executeCommand: async () => {},
});

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [executionState, setExecutionState] = useState<ExecutionState>({
    status: 'idle',
    tools: [],
    currentTool: null,
    toolOutput: null
  });

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Set execution state to running
    setExecutionState(prev => ({ ...prev, status: 'running' }));
    
    try {
      // Add temporary assistant message
      const assistantMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I'll help you with that...",
        timestamp: new Date(),
        tools: []
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Start streaming response
      const cleanup = await openManusService.streamAgentResponse(content, (data) => {
        // Update assistant message with streaming content
        setMessages(prev => {
          const messages = [...prev];
          const lastMessageIndex = messages.length - 1;
          
          if (data.result) {
            messages[lastMessageIndex] = {
              ...messages[lastMessageIndex],
              content: data.result
            };
          }
          
          // Update tool information if available
          if (data.tools_used && data.tools_used.length > 0) {
            const currentTool = data.tools_used[data.tools_used.length - 1];
            const mappedToolName = mapToolName(currentTool);
            
            // Update execution state
            setExecutionState(prev => ({
              ...prev,
              currentTool: mappedToolName,
              toolOutput: data.output || prev.toolOutput,
              tools: data.tools_used.map(mapToolName)
            }));
            
            // Update tools in message
            const tools = messages[lastMessageIndex].tools || [];
            const toolIndex = tools.findIndex(t => t.name === mappedToolName);
            
            if (toolIndex >= 0) {
              tools[toolIndex] = {
                ...tools[toolIndex],
                output: data.output,
                status: data.status === 'completed' ? 'completed' : 
                       data.status === 'error' ? 'error' : 'running'
              };
            } else {
              tools.push({
                name: mappedToolName,
                output: data.output,
                status: data.status === 'completed' ? 'completed' : 
                       data.status === 'error' ? 'error' : 'running'
              });
            }
            
            messages[lastMessageIndex] = {
              ...messages[lastMessageIndex],
              tools
            };
          }
          
          return messages;
        });
        
        // Update execution state based on overall status
        if (data.status) {
          setExecutionState(prev => ({
            ...prev,
            status: data.status
          }));
        }
      });
      
      // Cleanup on completion
      setTimeout(() => {
        cleanup();
        setExecutionState(prev => ({
          ...prev,
          status: 'idle',
          currentTool: null
        }));
      }, 1000);
      
    } catch (error) {
      console.error("Error processing request:", error);
      
      // Add error message
      setMessages(prev => ([
        ...prev, 
        { 
          id: (Date.now() + 2).toString(),
          role: 'system', 
          content: 'An error occurred while processing your request. Please try again.',
          timestamp: new Date()
        }
      ]));
      
      setExecutionState({
        status: 'error',
        tools: [],
        currentTool: null,
        toolOutput: null
      });
    }
  };

  const executeCommand = async (command: string) => {
    setExecutionState(prev => ({ 
      ...prev, 
      status: 'running',
      currentTool: 'bash',
      toolOutput: `$ ${command}\nExecuting...`
    }));
    
    try {
      // Send direct command to OpenManus
      const response = await openManusService.sendQuery(`Execute this command: ${command}`);
      
      setExecutionState(prev => ({ 
        ...prev, 
        status: 'completed',
        toolOutput: `$ ${command}\n${response.output || 'Command executed successfully.'}`
      }));
      
      setTimeout(() => {
        setExecutionState(prev => ({
          ...prev,
          status: 'idle',
          currentTool: null
        }));
      }, 3000);
      
    } catch (error) {
      console.error("Error executing command:", error);
      
      setExecutionState(prev => ({ 
        ...prev, 
        status: 'error',
        toolOutput: `$ ${command}\nError: Failed to execute command.`
      }));
    }
  };

  return (
    <ConversationContext.Provider value={{ messages, executionState, sendMessage, executeCommand }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
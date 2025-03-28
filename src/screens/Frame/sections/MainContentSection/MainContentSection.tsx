import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { useConversation } from "../../../../context/ConversationContext";

export const MainContentSection = (): JSX.Element => {
  const { messages, executionState, sendMessage } = useConversation();
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || executionState.status === 'running') return;
    
    await sendMessage(userInput);
    setUserInput("");
  };

  const renderMessage = (message: any, index: number) => {
    switch (message.role) {
      case 'user':
        return (
          <div key={index} className="flex justify-end mb-4">
            <div className="inline-flex items-center p-[13px] bg-[var(--fill-white)] rounded-[12px_12px_0px_12px] border border-[var(--border-light)] max-w-[80%]">
              <p className="text-[var(--text-primary)] text-[14.8px] leading-6 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        );
        
      case 'assistant':
        return (
          <div key={index} className="flex flex-col items-start mb-4">
            <div className="flex h-7 items-center px-0 py-0.5 mb-1">
              <div className="w-6 h-6 bg-[var(--icon-brand)] rounded-full flex items-center justify-center text-white text-xs font-bold">
                OM
              </div>
              <span className="font-manus-im-libre-baskerville-regular text-[var(--text-primary)] ml-2">OpenManus</span>
            </div>
            <div className="bg-[var(--fill-tsp-white-main)] rounded-[12px_12px_12px_0px] border border-[var(--border-light)] p-[13px] max-w-[80%]">
              <p className="text-[var(--text-primary)] text-[14.8px] leading-7 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
            
            {/* Render tools used */}
            {message.tools && message.tools.length > 0 && (
              <div className="mt-2 flex flex-col w-full gap-2">
                {message.tools.map((tool: any, toolIndex: number) => (
                  <div 
                    key={toolIndex} 
                    className="flex items-center gap-2 py-1 px-3 bg-[var(--fill-tsp-white-dark)] rounded-md"
                  >
                    <div className="w-4 h-4 bg-[var(--icon-brand)] rounded flex items-center justify-center text-white text-[8px] font-bold">
                      {tool.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm">
                      {tool.name}
                    </span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      tool.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : tool.status === 'error'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'system':
        return (
          <div key={index} className="flex justify-center mb-4">
            <div className="inline-flex items-center p-[13px] bg-[var(--fill-tsp-gray-main)] rounded-md border border-[var(--border-light)]">
              <p className="text-[var(--text-secondary)] text-[14.8px] leading-6">
                {message.content}
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-52px)] flex flex-col bg-[var(--background-gray-main)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-[800px] mx-auto">
          {/* Welcome message if no messages */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 mb-4 bg-[var(--icon-brand)] rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                OM
              </div>
              <h2 className="text-xl font-manus-im-inter-semi-bold text-[var(--text-primary)] mb-2">
                Welcome to OpenManus
              </h2>
              <p className="text-[var(--text-secondary)] max-w-md mb-8">
                An open-source framework for building general AI agents, enabling developers to create
                versatile AI assistants that can execute complex tasks.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <Button 
                  className="flex items-center gap-2 py-2 px-4 rounded-md bg-[var(--fill-tsp-white-main)] text-[var(--text-primary)] border border-[var(--border-light)] hover:bg-[var(--fill-tsp-white-dark)]"
                  onClick={() => sendMessage("Browse the web for the latest AI news")}
                >
                  <div className="w-5 h-5 bg-[var(--icon-brand)] rounded flex items-center justify-center text-white text-[10px] font-bold">
                    BR
                  </div>
                  <span>Browse Web</span>
                </Button>
                <Button 
                  className="flex items-center gap-2 py-2 px-4 rounded-md bg-[var(--fill-tsp-white-main)] text-[var(--text-primary)] border border-[var(--border-light)] hover:bg-[var(--fill-tsp-white-dark)]"
                  onClick={() => sendMessage("Write a simple Python function to calculate Fibonacci numbers")}
                >
                  <div className="w-5 h-5 bg-[var(--icon-brand)] rounded flex items-center justify-center text-white text-[10px] font-bold">
                    CD
                  </div>
                  <span>Write Code</span>
                </Button>
                <Button 
                  className="flex items-center gap-2 py-2 px-4 rounded-md bg-[var(--fill-tsp-white-main)] text-[var(--text-primary)] border border-[var(--border-light)] hover:bg-[var(--fill-tsp-white-dark)]"
                  onClick={() => sendMessage("List files in the current directory")}
                >
                  <div className="w-5 h-5 bg-[var(--icon-brand)] rounded flex items-center justify-center text-white text-[10px] font-bold">
                    FL
                  </div>
                  <span>Manage Files</span>
                </Button>
                <Button 
                  className="flex items-center gap-2 py-2 px-4 rounded-md bg-[var(--fill-tsp-white-main)] text-[var(--text-primary)] border border-[var(--border-light)] hover:bg-[var(--fill-tsp-white-dark)]"
                  onClick={() => sendMessage("Run 'echo Hello, OpenManus!' in the terminal")}
                >
                  <div className="w-5 h-5 bg-[var(--icon-brand)] rounded flex items-center justify-center text-white text-[10px] font-bold">
                    TM
                  </div>
                  <span>Run Terminal</span>
                </Button>
              </div>
            </div>
          )}
          
          {/* Render messages */}
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-[var(--border-main)]">
        <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask OpenManus to perform a task..."
                className="w-full h-12 px-4 py-3 bg-[var(--fill-tsp-white-main)] border border-[var(--border-light)] rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[var(--icon-brand)]"
                disabled={executionState.status === 'running'}
              />
            </div>
            <Button 
              type="submit"
              className="h-12 px-6 bg-[var(--icon-brand)] text-white rounded-md hover:opacity-90 flex items-center gap-2"
              disabled={executionState.status === 'running'}
            >
              {executionState.status === 'running' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[var(--icon-brand)] text-[10px] font-bold">
                    →
                  </div>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
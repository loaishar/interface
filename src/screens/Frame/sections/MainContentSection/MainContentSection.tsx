import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { useConversation } from "../../../../context/ConversationContext";
import { TaskList, Task } from "../../../../components/ui/task-list";
import { Chart } from "../../../../components/ui/chart";

export const MainContentSection = (): JSX.Element => {
  const { messages, executionState, sendMessage } = useConversation();
  const [userInput, setUserInput] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Example tasks for demonstration
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Create Tesla Stock Analysis",
      completed: true,
      progress: 100,
      subtasks: [
        {
          id: "1-1",
          title: "Gather Tesla Company Overview",
          completed: true,
          description: "Collect basic company information and history"
        },
        {
          id: "1-2",
          title: "Collect Financial Data",
          completed: true,
          description: "Retrieve historical stock prices and financial statements"
        }
      ]
    },
    {
      id: "2",
      title: "Analyze Market Trends",
      completed: false,
      progress: 45,
      subtasks: [
        {
          id: "2-1",
          title: "Calculate Technical Indicators",
          completed: true,
          description: "Compute RSI, MACD, and Bollinger Bands"
        },
        {
          id: "2-2",
          title: "Analyze Market Sentiment",
          completed: false,
          description: "Process news articles and social media data",
          hasChart: true
        }
      ]
    },
    {
      id: "3",
      title: "Generate Investment Recommendations",
      completed: false,
      progress: 0
    }
  ]);

  // Example chart data
  const chartData = [
    { label: "Jan", value: 42 },
    { label: "Feb", value: 63 },
    { label: "Mar", value: 52 },
    { label: "Apr", value: 78 },
    { label: "May", value: 91 },
    { label: "Jun", value: 85 }
  ];

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

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    const updateTaskStatus = (tasks: Task[]): Task[] => {
      return tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed };
        } else if (task.subtasks) {
          return { ...task, subtasks: updateTaskStatus(task.subtasks) };
        }
        return task;
      });
    };
    
    setTasks(updateTaskStatus(tasks));
  };

  const skipToResults = () => {
    // Simulate skipping to results
    setShowTasks(false);
  };

  const renderMessage = (message: any, index: number) => {
    switch (message.role) {
      case 'user':
        return (
          <div key={index} className="flex justify-end mb-4">
            <div className="inline-flex items-center p-[13px] bg-fill-white rounded-[12px_12px_0px_12px] border border-border-light max-w-[80%]">
              <p className="text-text-primary text-[14.8px] leading-6 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        );
        
      case 'assistant':
        return (
          <div key={index} className="flex flex-col items-start mb-4">
            <div className="flex h-7 items-center px-0 py-0.5 mb-1">
              <div className="w-6 h-6 bg-icon-brand rounded-full flex items-center justify-center text-white text-xs font-bold">
                OM
              </div>
              <span className="font-manus-im-libre-baskerville-regular text-text-primary ml-2">OpenManus</span>
            </div>
            <div className="bg-fill-tsp-white-main rounded-[12px_12px_12px_0px] border border-border-light p-[13px] max-w-[80%]">
              <p className="text-text-primary text-[14.8px] leading-7 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
            
            {/* Render tools used */}
            {message.tools && message.tools.length > 0 && (
              <div className="mt-2 flex flex-col w-full gap-2">
                {message.tools.map((tool: any, toolIndex: number) => (
                  <div
                    key={toolIndex}
                    className="flex items-center gap-2 py-1 px-3 bg-fill-tsp-white-dark rounded-md"
                  >
                    <div className="w-4 h-4 bg-icon-brand rounded flex items-center justify-center text-white text-[8px] font-bold">
                      {tool.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-text-secondary text-sm">
                      {tool.name}
                    </span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      tool.status === 'completed'
                        ? 'bg-background-success text-function-success'
                        : tool.status === 'error'
                        ? 'bg-background-error text-function-error'
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
            <div className="inline-flex items-center p-[13px] bg-fill-tsp-gray-main rounded-md border border-border-light">
              <p className="text-text-secondary text-[14.8px] leading-6">
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
    <div className="h-[calc(100vh-52px)] flex flex-col bg-background-gray-main">
      {/* Task list toggle button */}
      <div className="flex justify-between items-center px-6 py-2 border-b border-border-light">
        <Button
          className={`text-sm px-3 py-1 ${showTasks ? 'bg-icon-brand text-white' : 'bg-fill-tsp-white-main text-text-primary border border-border-light'}`}
          onClick={() => setShowTasks(!showTasks)}
        >
          {showTasks ? 'Hide Tasks' : 'Show Tasks'}
        </Button>
        
        {/* Execution status */}
        {executionState.status === 'running' && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-icon-brand border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-secondary text-sm">Processing...</span>
          </div>
        )}
      </div>
      
      {/* Main content area with optional task list */}
      <div className="flex flex-1 overflow-hidden">
        {/* Task list sidebar (conditionally shown) */}
        {showTasks && (
          <div className="w-[300px] border-r border-border-light overflow-y-auto p-4 bg-fill-white">
            <TaskList
              tasks={tasks}
              onTaskToggle={handleTaskToggle}
              onSkipToResults={skipToResults}
            />
            
            {/* Example chart */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-text-primary mb-2">Market Performance</h3>
              <Chart
                data={chartData}
                type="line"
                height={180}
              />
            </div>
          </div>
        )}
        
        {/* Messages area */}
        <div className={`flex-1 overflow-y-auto px-6 py-4 ${showTasks ? '' : 'w-full'}`}>
          <div className="max-w-[800px] mx-auto">
            {/* Welcome message if no messages */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 mb-4 bg-icon-brand rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                  OM
                </div>
                <h2 className="text-xl font-manus-im-inter-semi-bold text-text-primary mb-2">
                  Welcome to OpenManus
                </h2>
                <p className="text-text-secondary max-w-md mb-8">
                  An open-source framework for building general AI agents, enabling developers to create
                  versatile AI assistants that can execute complex tasks.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Button
                    className="flex items-center gap-2 py-2 px-4 rounded-md bg-fill-tsp-white-main text-text-primary border border-border-light hover:bg-fill-tsp-white-dark"
                    onClick={() => sendMessage("Browse the web for the latest AI news")}
                  >
                    <div className="w-5 h-5 bg-icon-brand rounded flex items-center justify-center text-white text-[10px] font-bold">
                      BR
                    </div>
                    <span>Browse Web</span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 py-2 px-4 rounded-md bg-fill-tsp-white-main text-text-primary border border-border-light hover:bg-fill-tsp-white-dark"
                    onClick={() => sendMessage("Write a simple Python function to calculate Fibonacci numbers")}
                  >
                    <div className="w-5 h-5 bg-icon-brand rounded flex items-center justify-center text-white text-[10px] font-bold">
                      CD
                    </div>
                    <span>Write Code</span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 py-2 px-4 rounded-md bg-fill-tsp-white-main text-text-primary border border-border-light hover:bg-fill-tsp-white-dark"
                    onClick={() => sendMessage("List files in the current directory")}
                  >
                    <div className="w-5 h-5 bg-icon-brand rounded flex items-center justify-center text-white text-[10px] font-bold">
                      FL
                    </div>
                    <span>Manage Files</span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 py-2 px-4 rounded-md bg-fill-tsp-white-main text-text-primary border border-border-light hover:bg-fill-tsp-white-dark"
                    onClick={() => sendMessage("Run 'echo Hello, OpenManus!' in the terminal")}
                  >
                    <div className="w-5 h-5 bg-icon-brand rounded flex items-center justify-center text-white text-[10px] font-bold">
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
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-border-main">
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
                className="w-full h-12 px-4 py-3 bg-fill-tsp-white-main border border-border-light rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-icon-brand"
                disabled={executionState.status === 'running'}
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-6 bg-icon-brand text-white rounded-md hover:opacity-90 flex items-center gap-2"
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
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-icon-brand text-[10px] font-bold">
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
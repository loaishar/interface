import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";
import { Badge } from "../../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { useConversation } from "../../../../context/ConversationContext";
import { Chart } from "../../../../components/ui/chart";

// Import tool view components
import { BrowserView } from "./tools/BrowserView";
import { TerminalView } from "./tools/TerminalView";
import { CodeView } from "./tools/CodeView";
import { FileView } from "./tools/FileView";

export const ToolOutputSection = (): JSX.Element => {
  const { executionState, executeCommand } = useConversation();
  const { status, currentTool, toolOutput } = executionState;
  const isRunning = status === 'running';
  
  // State for command input and tool history
  const [command, setCommand] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  
  // Example performance metrics for visualization
  const performanceData = [
    { label: "CPU", value: 45 },
    { label: "Memory", value: 62 },
    { label: "Network", value: 28 },
    { label: "Disk", value: 15 }
  ];
  
  // Handle command execution
  const handleCommandExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && status !== 'running') {
      executeCommand(command);
      setCommand("");
    }
  };
  
  // Determine which tool view to show based on current tool
  const renderToolView = () => {
    switch (currentTool) {
      case "browser_use":
        return <BrowserView output={toolOutput} />;
      case "bash":
      case "terminal":
        return <TerminalView output={toolOutput} />;
      case "python_execute":
        return <CodeView output={toolOutput} language="python" />;
      case "str_replace_editor":
        return <FileView output={toolOutput} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <p className="text-text-secondary mb-6">
              {isRunning
                ? "OpenManus is processing your request..."
                : "No active tool running. Send a command to start."}
            </p>
            
            {!isRunning && !currentTool && (
              <div className="w-full max-w-md">
                <h3 className="text-sm font-medium text-text-primary mb-3">System Performance</h3>
                <Chart
                  data={performanceData}
                  type="bar"
                  height={150}
                />
              </div>
            )}
          </div>
        );
    }
  };

  // Calculate progress percentage based on tools used
  const calculateProgress = () => {
    if (!isRunning) return 100;
    
    // In a real implementation, this would be based on actual progress
    // For now, we'll use a simple heuristic based on the number of tools used
    const toolCount = executionState.tools.length;
    return Math.min(Math.max(toolCount * 25, 5), 95); // Between 5% and 95%
  };

  return (
    <div className="flex flex-col items-start pl-3 pr-4 py-0 h-[calc(100vh-52px)] bg-background-gray-main">
      <div className="flex flex-col w-full items-start justify-center px-0 py-3">
        <Card className="w-full rounded-[22px] bg-fill-tsp-white-main border-none">
          <CardContent className="flex flex-col items-start gap-3 p-4">
            {/* Header with agent name and status */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <h3 className="font-manus-im-inter-semi-bold text-text-primary text-lg">
                  OpenManus Agent
                </h3>
              </div>
              
              {/* Status badge */}
              {status === 'running' && (
                <Badge className="bg-function-success text-white">
                  Active
                </Badge>
              )}
              {status === 'error' && (
                <Badge className="bg-function-error text-white">
                  Error
                </Badge>
              )}
              {status === 'completed' && currentTool && (
                <Badge className="bg-function-info text-white">
                  Completed
                </Badge>
              )}
              
              {/* Settings button */}
              <div className="flex w-7 h-7 items-center justify-center p-1 rounded-md hover:bg-fill-tsp-white-dark">
                <div className="w-5 h-5 text-text-secondary flex items-center justify-center">
                  ⚙️
                </div>
              </div>
            </div>

            {/* Tool info section */}
            {currentTool && (
              <div className="flex items-center gap-2 w-full">
                <div className="w-10 h-10 items-center justify-center p-1.5 bg-fill-tsp-white-dark rounded-lg flex">
                  <div className="w-7 h-7 bg-icon-brand rounded flex items-center justify-center text-white text-xs font-bold">
                    {currentTool ? currentTool.substring(0, 2).toUpperCase() : "OM"}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1 flex-1">
                  <div className="w-full">
                    <p className="font-normal text-[11.1px] leading-[18px]">
                      <span className="text-text-secondary">OpenManus is using </span>
                      <span className="text-text-primary font-medium">
                        {currentTool === "browser_use" && "Browser"}
                        {currentTool === "bash" && "Terminal"}
                        {currentTool === "python_execute" && "Python Executor"}
                        {currentTool === "str_replace_editor" && "File Editor"}
                      </span>
                    </p>
                  </div>

                  {/* Tool status badge */}
                  <Badge
                    className={`flex items-center gap-[5.68e-14px] px-[11px] py-1 border-none rounded-full ${
                      status === 'running'
                        ? 'bg-fill-tsp-white-dark text-text-secondary'
                        : status === 'error'
                        ? 'bg-background-error text-function-error'
                        : 'bg-background-success text-function-success'
                    }`}
                  >
                    <span className="font-normal text-[12.1px] leading-[19.5px] whitespace-nowrap">
                      {status === 'running'
                        ? 'Tool running'
                        : status === 'error'
                        ? 'Error occurred'
                        : 'Completed'}
                    </span>
                  </Badge>
                </div>
              </div>
            )}

            {/* Tabs for different views */}
            <Tabs defaultValue="output" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="output">Tool Output</TabsTrigger>
                <TabsTrigger value="logs">Agent Logs</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              {/* Tool Output Tab */}
              <TabsContent value="output" className="mt-2">
                <Card className="flex flex-col w-full bg-fill-tsp-white-main rounded-xl overflow-hidden border-none">
                  {/* Tool view header */}
                  <div className="flex h-9 items-center justify-center px-3 py-0 bg-background-code rounded-[12px_12px_0px_0px] border-b border-[#182533]">
                    <div className="flex items-center justify-center flex-1">
                      <div className="w-[250px] overflow-hidden text-center">
                        <p className="font-medium text-text-tertiary text-[13.6px] leading-5 whitespace-nowrap truncate">
                          {currentTool
                            ? `OpenManus - ${currentTool}`
                            : "OpenManus Agent"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tool output container */}
                  <div className="h-[527.5px] bg-fill-tsp-white-main overflow-auto">
                    {renderToolView()}
                  </div>

                  {/* Footer with progress */}
                  {isRunning && (
                    <div className="flex h-11 items-center gap-2 px-4 py-[10px] bg-fill-tsp-white-main border-t border-[#182533]">
                      <div className="flex-1 relative h-1">
                        <Progress
                          value={calculateProgress()}
                          className="h-1 bg-[#182533] rounded-full"
                        />
                      </div>
                      <span className="text-xs text-text-tertiary">{Math.round(calculateProgress())}%</span>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              {/* Agent Logs Tab */}
              <TabsContent value="logs" className="mt-2">
                <Card className="flex flex-col w-full bg-fill-tsp-white-main rounded-xl overflow-hidden border-none h-[567.5px]">
                  <div className="p-4 font-mono text-sm h-full overflow-auto">
                    <div className="text-text-secondary">
                      {/* Agent logs would be displayed here */}
                      <p className="text-function-info">[INFO] OpenManus agent initialized</p>
                      <p className="text-function-info">[INFO] Loaded tools: browser_use, bash, python_execute, str_replace_editor</p>
                      {isRunning && <p className="text-function-info">[INFO] Processing user request...</p>}
                      {executionState.tools.map((tool, index) => (
                        <p key={index} className="text-function-info">[INFO] Used tool: {tool}</p>
                      ))}
                      
                      {/* Example logs */}
                      <p className="text-function-warning">[WARN] Network latency detected</p>
                      <p className="text-function-error">[ERROR] Failed to load external resource</p>
                      <p className="text-function-success">[SUCCESS] Task completed successfully</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history" className="mt-2">
                <Card className="flex flex-col w-full bg-fill-tsp-white-main rounded-xl overflow-hidden border-none h-[567.5px]">
                  <div className="p-4 h-full overflow-auto">
                    <h3 className="text-sm font-medium text-text-primary mb-3">Recent Tool Usage</h3>
                    
                    <div className="space-y-2">
                      {/* Example history items */}
                      <div className="p-3 bg-fill-tsp-white-dark rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-icon-brand rounded flex items-center justify-center text-white text-[8px] font-bold">
                              BR
                            </div>
                            <span className="text-sm font-medium text-text-primary">Browser</span>
                          </div>
                          <span className="text-xs text-text-tertiary">2 min ago</span>
                        </div>
                        <p className="text-xs text-text-secondary">Browsed web for Tesla stock information</p>
                      </div>
                      
                      <div className="p-3 bg-fill-tsp-white-dark rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-icon-brand rounded flex items-center justify-center text-white text-[8px] font-bold">
                              PY
                            </div>
                            <span className="text-sm font-medium text-text-primary">Python</span>
                          </div>
                          <span className="text-xs text-text-tertiary">5 min ago</span>
                        </div>
                        <p className="text-xs text-text-secondary">Executed Python code for data analysis</p>
                      </div>
                      
                      <div className="p-3 bg-fill-tsp-white-dark rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-icon-brand rounded flex items-center justify-center text-white text-[8px] font-bold">
                              TM
                            </div>
                            <span className="text-sm font-medium text-text-primary">Terminal</span>
                          </div>
                          <span className="text-xs text-text-tertiary">10 min ago</span>
                        </div>
                        <p className="text-xs text-text-secondary">Ran command to fetch market data</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Command input field */}
            <form onSubmit={handleCommandExecute} className="w-full h-[38px]">
              <Card className="flex justify-between items-start rounded-xl bg-fill-tsp-white-main border-none">
                <div className="flex items-center gap-2.5 px-4 py-2 w-full">
                  <div className="w-4 h-4 bg-icon-brand rounded flex items-center justify-center text-white text-[8px] font-bold">
                    $
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Enter a command to execute directly..."
                      className="w-full bg-transparent border-none outline-none font-normal text-text-primary text-[12.8px] leading-5"
                      disabled={isRunning}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isRunning || !command.trim()}
                  className="flex items-center gap-2 py-2.5 px-[13px] text-icon-brand disabled:opacity-50"
                >
                  Run
                </button>
              </Card>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
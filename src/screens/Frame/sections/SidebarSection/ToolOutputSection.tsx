import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";
import { Badge } from "../../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { useConversation } from "../../../../context/ConversationContext";

// Import tool view components
import { BrowserView } from "./tools/BrowserView";
import { TerminalView } from "./tools/TerminalView";
import { CodeView } from "./tools/CodeView";
import { FileView } from "./tools/FileView";

export const ToolOutputSection = (): JSX.Element => {
  const { executionState, executeCommand } = useConversation();
  const { status, currentTool, toolOutput } = executionState;
  const isRunning = status === 'running';
  
  // State for command input
  const [command, setCommand] = React.useState("");
  
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
          <div className="flex items-center justify-center h-full">
            <p className="text-[var(--text-secondary)]">
              {isRunning 
                ? "OpenManus is processing your request..." 
                : "No active tool running. Send a command to start."}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-start pl-3 pr-4 py-0 h-[calc(100vh-52px)] bg-[var(--background-gray-main)]">
      <div className="flex flex-col w-full items-start justify-center px-0 py-3">
        <Card className="w-full rounded-[22px] bg-[var(--fill-tsp-white-main)] border-none">
          <CardContent className="flex flex-col items-start gap-3 p-4">
            {/* Header with agent name and status */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <h3 className="font-manus-im-inter-semi-bold text-[var(--text-primary)] text-lg">
                  OpenManus Agent
                </h3>
              </div>
              {isRunning && (
                <Badge className="bg-[var(--function-success)] text-white">
                  Active
                </Badge>
              )}
              <div className="flex w-7 h-7 items-center justify-center p-1 rounded-md hover:bg-[var(--fill-tsp-white-dark)]">
                <div className="w-5 h-5 text-[var(--text-secondary)] flex items-center justify-center">
                  ⚙️
                </div>
              </div>
            </div>

            {/* Tool info section */}
            {currentTool && (
              <div className="flex items-center gap-2 w-full">
                <div className="w-10 h-10 items-center justify-center p-1.5 bg-[var(--fill-tsp-white-dark)] rounded-lg flex">
                  <div className="w-7 h-7 bg-[var(--icon-brand)] rounded flex items-center justify-center text-white text-xs font-bold">
                    {currentTool ? currentTool.substring(0, 2).toUpperCase() : "OM"}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1 flex-1">
                  <div className="w-full">
                    <p className="font-normal text-[11.1px] leading-[18px]">
                      <span className="text-[var(--text-secondary)]">OpenManus is using </span>
                      <span className="text-[var(--text-primary)] font-medium">
                        {currentTool === "browser_use" && "Browser"}
                        {currentTool === "bash" && "Terminal"}
                        {currentTool === "python_execute" && "Python Executor"}
                        {currentTool === "str_replace_editor" && "File Editor"}
                      </span>
                    </p>
                  </div>

                  {isRunning && (
                    <Badge
                      className="flex items-center gap-[5.68e-14px] px-[11px] py-1 bg-[var(--fill-tsp-white-dark)] border-none rounded-full"
                      variant="outline"
                    >
                      <span className="font-normal text-[var(--text-secondary)] text-[12.1px] leading-[19.5px] whitespace-nowrap">
                        Tool running
                      </span>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Tabs for different views */}
            <Tabs defaultValue="output" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="output">Tool Output</TabsTrigger>
                <TabsTrigger value="logs">Agent Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="output" className="mt-2">
                <Card className="flex flex-col w-full bg-[var(--fill-tsp-white-main)] rounded-xl overflow-hidden border-none">
                  {/* Tool view header */}
                  <div className="flex h-9 items-center justify-center px-3 py-0 bg-[#242F3D] rounded-[12px_12px_0px_0px] border-b border-[#182533]">
                    <div className="flex items-center justify-center flex-1">
                      <div className="w-[250px] overflow-hidden text-center">
                        <p className="font-medium text-[#8B9398] text-[13.6px] leading-5 whitespace-nowrap truncate">
                          {currentTool 
                            ? `OpenManus - ${currentTool}` 
                            : "OpenManus Agent"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tool output container */}
                  <div className="h-[527.5px] bg-[var(--fill-tsp-white-main)] overflow-auto">
                    {renderToolView()}
                  </div>

                  {/* Footer with progress */}
                  {isRunning && (
                    <div className="flex h-11 items-center gap-2 px-4 py-[10px] bg-[var(--fill-tsp-white-main)] border-t border-[#182533]">
                      <div className="flex-1 relative h-1">
                        <Progress
                          value={45} // Replace with actual progress
                          className="h-1 bg-[#182533] rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>
              <TabsContent value="logs" className="mt-2">
                <Card className="flex flex-col w-full bg-[var(--fill-tsp-white-main)] rounded-xl overflow-hidden border-none h-[567.5px]">
                  <div className="p-4 font-mono text-sm h-full overflow-auto">
                    <div className="text-[var(--text-secondary)]">
                      {/* Agent logs would be displayed here */}
                      <p>[INFO] OpenManus agent initialized</p>
                      <p>[INFO] Loaded tools: browser_use, bash, python_execute, str_replace_editor</p>
                      {isRunning && <p>[INFO] Processing user request...</p>}
                      {executionState.tools.map((tool, index) => (
                        <p key={index}>[INFO] Used tool: {tool}</p>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Command input field */}
            <form onSubmit={handleCommandExecute} className="w-full h-[38px]">
              <Card className="flex justify-between items-start rounded-xl bg-[var(--fill-tsp-white-main)] border-none">
                <div className="flex items-center gap-2.5 px-4 py-2 w-full">
                  <div className="w-4 h-4 bg-[var(--icon-brand)] rounded flex items-center justify-center text-white text-[8px] font-bold">
                    $
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Enter a command to execute directly..."
                      className="w-full bg-transparent border-none outline-none font-normal text-[var(--text-primary)] text-[12.8px] leading-5"
                      disabled={isRunning}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isRunning || !command.trim()}
                  className="flex items-center gap-2 py-2.5 px-[13px] text-[var(--icon-brand)] disabled:opacity-50"
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
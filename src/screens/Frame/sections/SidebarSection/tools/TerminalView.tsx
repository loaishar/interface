import React from "react";

interface TerminalViewProps {
  output: any;
}

export const TerminalView = ({ output }: TerminalViewProps): React.ReactElement => {
  // Handle terminal output
  const terminalContent = typeof output === 'string'
    ? output
    : (output?.output || "No output available");
  
  // Process terminal output to detect errors
  const hasError = terminalContent.toLowerCase().includes("error") ||
                  terminalContent.toLowerCase().includes("exception") ||
                  terminalContent.toLowerCase().includes("failed");
  
  return (
    <div className="h-full p-4 font-mono text-sm bg-background-terminal text-white">
      <div className="whitespace-pre-wrap">
        {terminalContent.split('\n').map((line: string, index: number) => {
          // Highlight command lines
          if (line.startsWith("$")) {
            return (
              <div key={index} className="mb-1">
                <span className="text-function-success">{line}</span>
              </div>
            );
          }
          
          // Highlight error lines
          else if (
            line.toLowerCase().includes("error") ||
            line.toLowerCase().includes("exception") ||
            line.toLowerCase().includes("failed")
          ) {
            return (
              <div key={index} className="mb-1">
                <span className="text-function-error">{line}</span>
              </div>
            );
          }
          
          // Highlight warning lines
          else if (
            line.toLowerCase().includes("warning") ||
            line.toLowerCase().includes("warn")
          ) {
            return (
              <div key={index} className="mb-1">
                <span className="text-function-warning">{line}</span>
              </div>
            );
          }
          
          // Regular output
          else {
            return (
              <div key={index} className="mb-1">
                <span>{line}</span>
              </div>
            );
          }
        })}
      </div>
      
      {/* Show action buttons for error recovery */}
      {hasError && (
        <div className="mt-4 pt-4 border-t border-[#333333]">
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-background-code text-white rounded text-xs hover:bg-opacity-80">
              Copy Error
            </button>
            <button className="px-3 py-1 bg-function-info text-white rounded text-xs hover:bg-opacity-80">
              Troubleshoot
            </button>
            <button className="px-3 py-1 bg-function-success text-white rounded text-xs hover:bg-opacity-80">
              Retry Command
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
import React from "react";

interface TerminalViewProps {
  output: any;
}

export const TerminalView = ({ output }: TerminalViewProps): React.ReactElement => {
  // Handle terminal output
  const terminalContent = typeof output === 'string' 
    ? output 
    : (output?.output || "No output available");
  
  return (
    <div className="h-full p-4 font-mono text-sm bg-[#1E1E1E] text-white">
      <div className="whitespace-pre-wrap">
        {terminalContent.split('\n').map((line: string, index: number) => (
          <div key={index} className="mb-1">
            {line.startsWith("$") ? (
              <span className="text-[#8AE234]">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
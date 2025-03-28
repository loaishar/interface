import React from "react";

interface CodeViewProps {
  output: any;
  language: string;
}

export const CodeView = ({ output, language }: CodeViewProps): React.ReactElement => {
  // Process code output
  const code = typeof output === 'string' 
    ? output 
    : (output?.output || "# No code available");
  
  return (
    <div className="h-full overflow-auto">
      <div className="p-4 font-mono text-sm bg-[#1E1E1E] text-white">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
      
      {output?.success === false && (
        <div className="p-3 bg-[#FFE6E6] text-[#D32F2F] border-t border-[#FFCCCC]">
          <p className="font-mono text-sm">{output.observation || "Execution error"}</p>
        </div>
      )}
    </div>
  );
};
import React from "react";

interface FileViewProps {
  output: any;
}

export const FileView = ({ output }: FileViewProps): React.ReactElement => {
  // Process file content
  const fileContent = typeof output === 'string' 
    ? output 
    : (output?.output || "No file content available");
  
  // Extract file path if available
  const filePath = output?.path || "unknown.txt";
  
  return (
    <div className="flex flex-col h-full">
      {/* File header */}
      <div className="flex items-center px-4 py-2 bg-[#F1F3F4] border-b border-[#E1E3E5]">
        <span className="text-sm text-[var(--text-secondary)] truncate">{filePath}</span>
      </div>
      
      {/* File content */}
      <div className="flex-1 overflow-auto">
        <pre className="p-4 font-mono text-sm whitespace-pre-wrap">{fileContent}</pre>
      </div>
    </div>
  );
};
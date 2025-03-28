import React, { useState } from "react";

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
  
  // State for line numbers
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  
  // Determine file type for syntax highlighting
  const getFileType = (path: string): string => {
    const extension = path.split('.').pop()?.toLowerCase() || '';
    
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return 'javascript';
      case 'py':
        return 'python';
      case 'html':
      case 'htm':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };
  
  const fileType = getFileType(filePath);
  
  // Process content with line numbers
  const contentLines = fileContent.split('\n');
  const maxLineNumberWidth = String(contentLines.length).length;
  
  return (
    <div className="flex flex-col h-full">
      {/* File header */}
      <div className="flex items-center justify-between px-4 py-2 bg-fill-tsp-white-dark border-b border-border-light">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary truncate">{filePath}</span>
          <span className="text-xs text-text-tertiary bg-fill-tsp-white-main px-2 py-0.5 rounded">
            {fileType}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded hover:bg-fill-tsp-white-main"
            onClick={() => setShowLineNumbers(!showLineNumbers)}
          >
            {showLineNumbers ? 'Hide Line Numbers' : 'Show Line Numbers'}
          </button>
          <button className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded hover:bg-fill-tsp-white-main">
            Copy
          </button>
        </div>
      </div>
      
      {/* File content */}
      <div className="flex-1 overflow-auto bg-fill-white">
        <div className="p-4 font-mono text-sm">
          {contentLines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <div
                  className="text-text-tertiary select-none pr-4 text-right"
                  style={{ minWidth: `${maxLineNumberWidth + 2}ch` }}
                >
                  {index + 1}
                </div>
              )}
              <div className="flex-1 whitespace-pre-wrap text-text-primary">
                {line || ' '}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
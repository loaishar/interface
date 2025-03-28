import React from "react";
import { ErrorMessage, createSyntaxError } from "../../../../../components/ui/error-message";

interface CodeViewProps {
  output: any;
  language: string;
}

export const CodeView = ({ output, language }: CodeViewProps): React.ReactElement => {
  // Process code output
  const code = typeof output === 'string'
    ? output
    : (output?.output || "# No code available");
  
  // Extract error information if available
  const hasError = output?.success === false;
  const errorMessage = output?.observation || "Execution error";
  
  // Parse error message to extract line and column information
  let errorDetails = {
    message: errorMessage,
    line: 1,
    column: 1
  };
  
  if (hasError && typeof errorMessage === 'string') {
    // Try to extract line and column information from error message
    const lineMatch = errorMessage.match(/line (\d+)/i);
    const columnMatch = errorMessage.match(/column (\d+)/i);
    
    if (lineMatch) {
      errorDetails.line = parseInt(lineMatch[1], 10);
    }
    
    if (columnMatch) {
      errorDetails.column = parseInt(columnMatch[1], 10);
    }
  }
  
  return (
    <div className="h-full overflow-auto">
      <div className="p-4 font-mono text-sm bg-background-terminal text-white">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
      
      {hasError && (
        <div className="p-3">
          <ErrorMessage
            title="Code Execution Error"
            message={errorDetails.message}
            code={code}
            actions={[
              {
                label: "Copy Error",
                action: () => navigator.clipboard.writeText(errorDetails.message)
              },
              {
                label: "Fix Syntax",
                action: () => console.log("Fix syntax action"),
                primary: true
              }
            ]}
            documentation={language === "python"
              ? "https://docs.python.org/3/tutorial/errors.html"
              : "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors"}
          />
        </div>
      )}
    </div>
  );
};
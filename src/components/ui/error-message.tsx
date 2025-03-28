import React, { useState } from 'react';
import { Button } from './button';

interface ErrorAction {
  label: string;
  action: () => void;
  primary?: boolean;
}

interface ErrorMessageProps {
  title: string;
  message: string;
  code?: string;
  actions?: ErrorAction[];
  documentation?: string;
  className?: string;
  collapsible?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  code,
  actions = [],
  documentation,
  className = '',
  collapsible = true,
}) => {
  const [expanded, setExpanded] = useState(!collapsible);

  return (
    <div className={`rounded-lg overflow-hidden border border-function-error border-opacity-30 ${className}`}>
      {/* Error header */}
      <div 
        className="bg-background-error p-3 flex items-center justify-between cursor-pointer"
        onClick={() => collapsible && setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-function-error bg-opacity-20 flex items-center justify-center">
            <span className="text-function-error text-xs">!</span>
          </div>
          <h3 className="text-function-error font-medium text-sm">{title}</h3>
        </div>
        
        {collapsible && (
          <button className="text-text-secondary hover:text-text-primary">
            {expanded ? '▼' : '►'}
          </button>
        )}
      </div>
      
      {/* Error content */}
      {expanded && (
        <div className="p-3 bg-fill-white">
          <p className="text-sm text-text-primary mb-3">{message}</p>
          
          {/* Error code */}
          {code && (
            <div className="bg-background-terminal rounded p-2 mb-3 overflow-x-auto">
              <pre className="text-xs text-white font-mono whitespace-pre-wrap">{code}</pre>
            </div>
          )}
          
          {/* Documentation link */}
          {documentation && (
            <div className="mb-3">
              <a 
                href={documentation} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-icon-brand hover:underline flex items-center gap-1"
              >
                <span>📚</span>
                <span>View documentation</span>
              </a>
            </div>
          )}
          
          {/* Action buttons */}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={action.primary 
                    ? "bg-function-error text-white hover:bg-opacity-90 text-xs px-3 py-1" 
                    : "border border-function-error text-function-error bg-transparent hover:bg-background-error text-xs px-3 py-1"
                  }
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Common error types with suggested actions
export const createModuleNotFoundError = (moduleName: string, onInstall: () => void) => ({
  title: `Module Not Found: ${moduleName}`,
  message: `The required module '${moduleName}' could not be found. This usually means the package is not installed.`,
  code: `ModuleNotFoundError: No module named '${moduleName}'`,
  actions: [
    {
      label: `Install ${moduleName}`,
      action: onInstall,
      primary: true
    },
    {
      label: 'Copy Error',
      action: () => navigator.clipboard.writeText(`ModuleNotFoundError: No module named '${moduleName}'`)
    }
  ],
  documentation: `https://pypi.org/project/${moduleName}/`
});

export const createSyntaxError = (message: string, code: string, line: number, column: number) => ({
  title: 'Syntax Error',
  message: `There is a syntax error in your code at line ${line}, column ${column}.`,
  code: `${code}\n${'~'.repeat(column-1)}^ SyntaxError: ${message}`,
  actions: [
    {
      label: 'Copy Error',
      action: () => navigator.clipboard.writeText(`SyntaxError: ${message} at line ${line}, column ${column}`)
    }
  ],
  documentation: 'https://docs.python.org/3/tutorial/errors.html#syntax-errors'
});
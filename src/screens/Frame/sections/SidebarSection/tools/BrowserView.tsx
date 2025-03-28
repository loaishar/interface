import React, { useState } from "react";
import { Progress } from "../../../../../components/ui/progress";

interface BrowserViewProps {
  output: any;
}

export const BrowserView = ({ output }: BrowserViewProps): React.ReactElement => {
  // Extract relevant browser data
  const url = output?.url || "";
  const title = output?.title || "";
  const screenshot = output?.screenshot || "";
  const consoleOutput = output?.console || [];
  
  // State for tabs and loading simulation
  const [activeTab, setActiveTab] = useState<'view' | 'console'>('view');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(100);
  
  // Simulate page reload
  const handleReload = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Browser header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-fill-tsp-white-dark border-b border-border-light">
        <div className="flex items-center gap-1 bg-fill-white rounded px-2 py-1 flex-1 border border-border-light">
          <div className="w-4 h-4 text-icon-brand flex items-center justify-center text-[10px] font-bold">
            🔗
          </div>
          <span className="text-sm truncate text-text-secondary">{url}</span>
        </div>
        <button
          className="p-1 rounded hover:bg-fill-tsp-white-main"
          onClick={handleReload}
          disabled={isLoading}
        >
          <div className={`w-4 h-4 text-text-secondary flex items-center justify-center text-[10px] font-bold ${isLoading ? 'animate-spin' : ''}`}>
            🔄
          </div>
        </button>
      </div>
      
      {/* Loading progress */}
      {isLoading && (
        <div className="h-1">
          <Progress value={loadingProgress} className="h-1" />
        </div>
      )}
      
      {/* Browser tabs */}
      <div className="flex border-b border-border-light">
        <button
          className={`px-4 py-2 text-sm ${activeTab === 'view' ? 'text-icon-brand border-b-2 border-icon-brand' : 'text-text-secondary'}`}
          onClick={() => setActiveTab('view')}
        >
          View
        </button>
        <button
          className={`px-4 py-2 text-sm ${activeTab === 'console' ? 'text-icon-brand border-b-2 border-icon-brand' : 'text-text-secondary'}`}
          onClick={() => setActiveTab('console')}
        >
          Console
        </button>
      </div>
      
      {/* Browser content */}
      {activeTab === 'view' ? (
        <div className="flex-1 overflow-auto p-4 bg-fill-white">
          {title && (
            <div className="mb-4 pb-2 border-b border-border-light">
              <h2 className="text-lg font-medium text-text-primary">{title}</h2>
            </div>
          )}
          
          {screenshot ? (
            <img
              src={`data:image/jpeg;base64,${screenshot}`}
              alt="Browser screenshot"
              className="w-full h-auto border border-border-light rounded shadow-sm"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-text-secondary">No screenshot available</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-4 bg-background-terminal font-mono text-sm text-white">
          {consoleOutput.length > 0 ? (
            <div>
              {consoleOutput.map((log: any, index: number) => (
                <div key={index} className="mb-1">
                  {log.type === 'error' ? (
                    <div className="text-function-error">[ERROR] {log.message}</div>
                  ) : log.type === 'warning' ? (
                    <div className="text-function-warning">[WARN] {log.message}</div>
                  ) : (
                    <div>{log.message}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-text-tertiary">Console is empty</div>
          )}
        </div>
      )}
    </div>
  );
};
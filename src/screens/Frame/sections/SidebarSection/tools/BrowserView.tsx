import React from "react";

interface BrowserViewProps {
  output: any;
}

export const BrowserView = ({ output }: BrowserViewProps): React.ReactElement => {
  // Extract relevant browser data
  const url = output?.url || "";
  const title = output?.title || "";
  const screenshot = output?.screenshot || "";
  
  return (
    <div className="flex flex-col h-full">
      {/* Browser header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#F1F3F4] border-b border-[#E1E3E5]">
        <div className="flex items-center gap-1 bg-white rounded px-2 py-1 flex-1 border border-[#E1E3E5]">
          <div className="w-4 h-4 text-[var(--icon-brand)] flex items-center justify-center text-[10px] font-bold">
            🔗
          </div>
          <span className="text-sm truncate text-[var(--text-secondary)]">{url}</span>
        </div>
        <button className="p-1 rounded hover:bg-[var(--fill-tsp-white-dark)]">
          <div className="w-4 h-4 text-[var(--text-secondary)] flex items-center justify-center text-[10px] font-bold">
            🔄
          </div>
        </button>
      </div>
      
      {/* Browser content */}
      <div className="flex-1 overflow-auto p-4">
        {screenshot ? (
          <img 
            src={`data:image/jpeg;base64,${screenshot}`} 
            alt="Browser screenshot" 
            className="w-full h-auto"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[var(--text-secondary)]">No screenshot available</p>
          </div>
        )}
      </div>
    </div>
  );
};
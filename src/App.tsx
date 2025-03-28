import React from 'react';
import { ConversationProvider } from './context/ConversationContext';
import { MainContentSection } from './screens/Frame/sections/MainContentSection/MainContentSection';
import { ToolOutputSection } from './screens/Frame/sections/SidebarSection/ToolOutputSection';

const App: React.FC = () => {
  return (
    <ConversationProvider>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="h-[52px] flex items-center justify-between px-4 bg-[var(--fill-tsp-white-main)] border-b border-[var(--border-main)]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[var(--icon-brand)] rounded-lg flex items-center justify-center text-white text-xs font-bold">
              OM
            </div>
            <h1 className="font-manus-im-inter-semi-bold text-lg text-[var(--text-primary)]">
              OpenManus Interface
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-[var(--fill-tsp-white-dark)]">
              <div className="h-5 w-5 text-[var(--text-secondary)] flex items-center justify-center">
                ⚙️
              </div>
            </button>
            <button className="p-2 rounded-md hover:bg-[var(--fill-tsp-white-dark)]">
              <div className="h-5 w-5 text-[var(--text-secondary)] flex items-center justify-center">
                ❓
              </div>
            </button>
          </div>
        </header>
        
        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left side - Chat area */}
          <div className="flex-1 overflow-hidden">
            <MainContentSection />
          </div>
          
          {/* Right side - Tool output */}
          <div className="w-[400px] border-l border-[var(--border-main)] overflow-hidden">
            <ToolOutputSection />
          </div>
        </div>
      </div>
    </ConversationProvider>
  );
};

export default App;
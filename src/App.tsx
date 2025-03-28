import React from 'react';
import { ConversationProvider } from './context/ConversationContext';
import { MainContentSection } from './screens/Frame/sections/MainContentSection/MainContentSection';
import { ToolOutputSection } from './screens/Frame/sections/SidebarSection/ToolOutputSection';
import { ResponsiveContainer } from './components/ui/responsive-container';

const App: React.FC = () => {
  return (
    <ConversationProvider>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="h-[52px] flex items-center justify-between px-4 bg-fill-tsp-white-main border-b border-border-main">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-icon-brand rounded-lg flex items-center justify-center text-white text-xs font-bold">
              OM
            </div>
            <h1 className="font-manus-im-inter-semi-bold text-lg text-text-primary">
              OpenManus Interface
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-fill-tsp-white-dark">
              <div className="h-5 w-5 text-text-secondary flex items-center justify-center">
                ⚙️
              </div>
            </button>
            <button className="p-2 rounded-md hover:bg-fill-tsp-white-dark">
              <div className="h-5 w-5 text-text-secondary flex items-center justify-center">
                ❓
              </div>
            </button>
          </div>
        </header>
        
        {/* Main content with responsive container */}
        <ResponsiveContainer className="flex flex-1 overflow-hidden">
          {/* Left side - Chat area */}
          <div className="flex-1 overflow-hidden">
            <MainContentSection />
          </div>
          
          {/* Right side - Tool output */}
          <div className="w-[400px] border-l border-border-main overflow-hidden">
            <ToolOutputSection />
          </div>
        </ResponsiveContainer>
      </div>
    </ConversationProvider>
  );
};

export default App;
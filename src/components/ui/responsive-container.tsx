import React, { useState, useEffect } from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  mobileBreakpoint?: number;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  mobileBreakpoint = 768, // Default mobile breakpoint (md in Tailwind)
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if we're on mobile based on window width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [mobileBreakpoint]);

  // If we're rendering on the server, default to desktop view
  if (typeof window === 'undefined') {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // If we're not on mobile, render normally
  if (!isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // On mobile, we need to handle the responsive layout
  // Extract the left and right panes from children
  const childrenArray = React.Children.toArray(children);
  
  // Assuming the first child is the left pane and the second is the right pane
  const leftPane = childrenArray[0];
  const rightPane = childrenArray[1];

  return (
    <div className={`relative ${className}`}>
      {/* Mobile header with hamburger menu */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-fill-white border-b border-border-main">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-fill-tsp-white-dark"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <div className="h-0.5 w-5 bg-text-primary"></div>
              <div className="h-0.5 w-5 bg-text-primary"></div>
              <div className="h-0.5 w-5 bg-text-primary"></div>
            </div>
          </button>
          <h1 className="font-manus-im-inter-semi-bold text-lg text-text-primary">
            OpenManus
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-md hover:bg-fill-tsp-white-dark"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-5 h-5 text-text-secondary flex items-center justify-center">
              📋
            </div>
          </button>
          <button className="p-2 rounded-md hover:bg-fill-tsp-white-dark">
            <div className="w-5 h-5 text-text-secondary flex items-center justify-center">
              ⚙️
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile sidebar (left pane) */}
      <div 
        className={`fixed inset-0 z-20 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
        <div className="absolute top-0 left-0 w-4/5 h-full bg-fill-white overflow-y-auto">
          <div className="p-4 border-b border-border-main flex items-center justify-between">
            <h2 className="font-manus-im-inter-semi-bold text-lg text-text-primary">Menu</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-fill-tsp-white-dark"
            >
              <div className="w-5 h-5 text-text-secondary flex items-center justify-center">
                ✕
              </div>
            </button>
          </div>
          <div className="p-4">
            {leftPane}
          </div>
        </div>
      </div>
      
      {/* Main content (right pane) */}
      <div className="min-h-screen">
        {rightPane}
      </div>
      
      {/* Mobile footer with quick actions */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-fill-white border-t border-border-main p-2">
        <div className="flex justify-around">
          <button className="p-2 rounded-md hover:bg-fill-tsp-white-dark flex flex-col items-center">
            <div className="w-5 h-5 text-icon-brand flex items-center justify-center">
              💬
            </div>
            <span className="text-xs text-text-secondary mt-1">Chat</span>
          </button>
          <button className="p-2 rounded-md hover:bg-fill-tsp-white-dark flex flex-col items-center">
            <div className="w-5 h-5 text-icon-brand flex items-center justify-center">
              🌐
            </div>
            <span className="text-xs text-text-secondary mt-1">Browse</span>
          </button>
          <button className="p-2 rounded-md hover:bg-fill-tsp-white-dark flex flex-col items-center">
            <div className="w-5 h-5 text-icon-brand flex items-center justify-center">
              📁
            </div>
            <span className="text-xs text-text-secondary mt-1">Files</span>
          </button>
          <button className="p-2 rounded-md hover:bg-fill-tsp-white-dark flex flex-col items-center">
            <div className="w-5 h-5 text-icon-brand flex items-center justify-center">
              💻
            </div>
            <span className="text-xs text-text-secondary mt-1">Terminal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
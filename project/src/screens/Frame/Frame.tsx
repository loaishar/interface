import React from "react";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import { SidebarSection } from "./sections/SidebarSection";

export const Frame = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-manusimdesert-storm">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-manusimdesert-storm border-b border-[#0000000f]">
        <div className="flex h-[52px] items-center justify-between px-6 max-w-[1400px] mx-auto">
          <div className="inline-flex flex-col items-start">
            <img className="w-[117px] h-[38px]" alt="Logo" src="/component-1-48.svg" />
          </div>
          <h1 className="text-center text-manusimdune font-manus-im-inter-medium text-lg">
            Vertical Search AI Solutions in Fashion Industry
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-[#0000000a]">
              <img className="w-5 h-5" alt="Settings" src="/component-1-41.svg" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#0000000a]">
              <img className="w-5 h-5" alt="Menu" src="/component-1-38.svg" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="grid grid-cols-12 w-full pt-[52px] max-w-[1400px] mx-auto">
        <div className="col-span-7 border-r border-[#0000000f]">
          <MainContentSection />
        </div>
        <div className="col-span-5">
          <SidebarSection />
        </div>
      </div>
    </div>
  );
};

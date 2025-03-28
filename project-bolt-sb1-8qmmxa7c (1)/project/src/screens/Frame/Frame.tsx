import React from "react";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import { SidebarSection } from "./sections/SidebarSection";

const HEADER_HEIGHT = 52;

export const Frame = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--background-gray-main)]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-[var(--background-gray-main)] border-b border-[var(--border-main)]`}>
        <div className={`flex h-[${HEADER_HEIGHT}px] items-center justify-between px-6 max-w-[1400px] mx-auto`}>
          <div className="inline-flex flex-col items-start">
            <img className="w-[117px] h-[38px]" alt="Logo" src="/component-1-48.svg" />
          </div>
          <h1 className="text-center text-[var(--text-primary)] font-manus-im-inter-medium text-lg">
            Comprehensive Tesla Stock Analysis and Investment Insights
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-[var(--fill-tsp-white-dark)]">
              <img className="w-5 h-5" alt="Settings" src="/component-1-41.svg" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[var(--fill-tsp-white-dark)]">
              <img className="w-5 h-5" alt="Menu" src="/component-1-38.svg" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className={`flex w-full pt-[${HEADER_HEIGHT}px]`}>
        <div className="w-[59%] border-r border-[var(--border-main)]">
          <MainContentSection />
        </div>
        <div className="w-[41%]">
          <SidebarSection />
        </div>
      </div>
    </div>

  )
}
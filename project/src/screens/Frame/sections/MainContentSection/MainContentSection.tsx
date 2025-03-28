import { CheckCircleIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainContentSection = (): JSX.Element => {
  return (
    <div className="h-[calc(100vh-52px)] overflow-y-auto">
      <div className="w-full px-8 py-6">
        {/* Section intro */}
        <div className="mb-8">
          <h2 className="text-xl font-manus-im-inter-semi-bold text-manusimdune mb-3">
            Investigating AI Solutions in Fashion Retail
          </h2>
          <p className="text-manusimfuscous-gray text-sm leading-6">
            Exploring deployment scenarios, unique features, and benefits of vertical search AI solutions in the fashion industry.
          </p>
        </div>

        {/* User question */}
        <div className="flex flex-col w-full items-start gap-6">
          <div className="items-start pt-3 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
            <div className="flex flex-col items-end justify-end gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[90.98px] h-7" />
              <div className="inline-flex items-center p-[13px] bg-manusimwhite rounded-[12px_12px_0px_12px] border border-solid border-[#0000000f]">
                <p className="text-manusimdune text-[14.8px] leading-6">
                What vertical search AI solutions exist in the fashion industry? In which specific scenarios are
                they deployed? What are their pricing models? Which parts of the value chain do they serve?
                How do these products differentiate from one another?
                </p>
              </div>
            </div>
          </div>

          {/* Manus response */}
          <div className="items-start pt-3 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] flex flex-col bg-white rounded-lg p-6 shadow-sm">
            <div className="flex h-7 items-center px-0 py-0.5 relative self-stretch w-full">
              <img className="w-6 h-6" alt="Manus logo" src="/component-1.svg" />
              <span className="font-manus-im-libre-baskerville-regular text-manusimdune ml-2">Manus</span>
            </div>
            <p className="text-manusimdune text-[14.8px] leading-7">
              I'll research vertical search AI solutions in the fashion industry for you. I'll investigate their deployment
              scenarios, pricing models, value chain positioning, and differentiation factors.
            </p>
          </div>

          {/* Search activity */}
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center justify-center gap-2 relative self-stretch flex-[0_0_auto]">
                <div className="flex w-4 h-4 items-center justify-center p-[3px] relative bg-[#b9b9b7] rounded-[15px]">
                  <img className="relative w-2.5 h-2.5" alt="Check" src="/component-1-5.svg" />
                </div>
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-manusimdune text-[12.9px] tracking-[0] leading-5 whitespace-nowrap">
                    Search for fashion industry vertical search AI solutions
                  </div>
                </div>
                <img className="w-4 h-4" alt="Expand" src="/component-6.svg" />
              </div>
            </div>
            <div className="flex items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch w-6" />
              <div className="flex flex-col max-h-[100000px] items-start gap-3 pt-2 pb-0 px-0 relative flex-1 self-stretch grow">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-manusimfuscous-gray text-[12.9px] tracking-[0] leading-[21px]">
                    Starting research on vertical search AI solutions in the fashion industry.
                  </div>
                </div>
                <div className="flex w-full items-center justify-center relative">
                  <div className="flex flex-col items-start pt-0 pb-0.5 px-0 relative flex-1 grow">
                    <div className="inline-flex max-w-full items-center gap-[3px] px-[11px] py-1 relative flex-[0_0_auto] bg-[#37352f0a] rounded-[15px] border border-solid border-[#0000000a]">
                      <img className="w-[21px] h-[21px]" alt="Execute" src="/component-1-4.svg" />
                      <div className="flex items-center gap-1">
                        <span className="text-manusimfuscous-gray text-[12.1px]">Executing command</span>
                        <span className="text-manusimfriar-gray text-xs truncate">mkdir -p /home/ubuntu/fashion_ai_research</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
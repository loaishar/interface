import { CheckCircleIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainContentSection = (): JSX.Element => {
  return (
    <div className="h-[calc(100vh-52px)] overflow-y-auto bg-[var(--background-gray-main)]">
      <div className="w-full px-[162px] py-0">
        {/* User question */}
        <div className="flex flex-col max-w-[800px] w-full items-start gap-3 pt-3 pb-20 px-6">
          <div className="items-start pt-3 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
            <div className="flex flex-col items-end justify-end gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[90.98px] h-7" />
              <div className="inline-flex items-center p-[13px] bg-[var(--fill-white)] rounded-[12px_12px_0px_12px] border border-[var(--border-light)]">
                <p className="text-[var(--text-primary)] text-[14.8px] leading-6">
                I'd like a thorough analysis of Tesla stock, including:
                
                Summary: Company overview, key metrics, performance data and investment recommendations
                Financial Data: Revenue trends, profit margins, balance sheet and cash flow analysis
                Market Sentiment: Analyst ratings, sentiment indicators and news impact
                Technical Analysis: Price trends, technical indicators and support/resistance levels
                Compare Assets: Market share and financial metrics vs. key competitors
                Value Investor: Intrinsic value, growth potential and risk factors
                Investment Thesis: SWOT analysis and recommendations for different investor types
                </p>
              </div>
            </div>
          </div>

          {/* Manus response */}
          <div className="items-start pt-3 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
            <div className="flex h-7 items-center px-0 py-0.5 relative self-stretch w-full">
              <img className="w-6 h-6" alt="Manus logo" src="/component-1.svg" />
              <span className="font-manus-im-libre-baskerville-regular text-[var(--text-primary)] ml-2">Manus</span>
            </div>
            <p className="text-[var(--text-primary)] text-[14.8px] leading-7">
              I'll help you create a comprehensive analysis of Tesla stock. I'll gather the latest financial data, market 
              sentiment, technical analysis, competitive comparisons, and develop investment recommendations. This 
              will take some time to research thoroughly, but I'll work on it right away and provide you with a detailed 
              report.
            </p>
          </div>

          {/* Search activity */}
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center justify-center gap-2 relative self-stretch flex-[0_0_auto]">
                <div className="flex w-4 h-4 items-center justify-center p-[3px] relative bg-[var(--text-disable)] rounded-[15px]">
                  <img className="relative w-2.5 h-2.5" alt="Check" src="/component-1-5.svg" />
                </div>
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-[12.9px] tracking-[0] leading-5 whitespace-nowrap">
                    <span className="text-[var(--text-primary)]">Connected to datasource(6)</span>
                  </div>
                </div>
                <img className="w-4 h-4" alt="Expand" src="/component-6.svg" />
              </div>
            </div>
            <div className="flex items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch w-6" />
              <div className="flex flex-col max-h-[100000px] items-start gap-3 pt-2 pb-0 px-0 relative flex-1 self-stretch grow">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[var(--text-secondary)] text-[12.9px] tracking-[0] leading-[21px]">
                    {`Get stock chart
Get stock holders
Get stock insights
Get stock profile
Get stock SEC filing
Get what analysts are saying of a stock`}
                  </div>
                </div>
                <div className="flex w-full items-center justify-center relative">
                  <div className="flex flex-col items-start pt-0 pb-0.5 px-0 relative flex-1 grow">
                    <div className="inline-flex max-w-full items-center gap-[3px] px-[11px] py-1 relative flex-[0_0_auto] bg-[var(--fill-tsp-white-main)] rounded-[15px]">
                      <img className="w-[21px] h-[21px] text-[var(--icon-secondary)]" alt="Execute" src="/component-1-4.svg" />
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--text-secondary)] text-[12.1px]">Executing command</span>
                        <span className="text-[var(--text-tertiary)] text-xs truncate">mkdir -p /home/ubuntu/tesla_analysis/data</span>
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
  )
}
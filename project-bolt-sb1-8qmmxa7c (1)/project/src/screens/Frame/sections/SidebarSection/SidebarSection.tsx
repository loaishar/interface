import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";

export const SidebarSection = (): JSX.Element => {
  // Data for the browser URL
  const currentUrl =
    "https://www.lily.ai/resources/blog/how-vertical-ai-transforms-the-retail-value-chain/";
  const progressValue = 13; // Progress value in percentage

  return (
    <div className="flex flex-col items-start pl-3 pr-4 py-0 h-[calc(100vh-52px)] bg-[var(--background-gray-main)]">
      <div className="flex flex-col w-full items-start justify-center px-0 py-3">
        <Card className="w-full rounded-[22px] bg-[var(--fill-tsp-white-main)] border-none">
          <CardContent className="flex flex-col items-start gap-3 p-4">
            {/* Header with computer name */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <h3 className="font-manus-im-inter-semi-bold text-[var(--text-primary)] text-lg">
                  Manus&#39;s Computer
                </h3>
              </div>
              <div className="flex w-7 h-7 items-center justify-center p-1 rounded-md hover:bg-[var(--fill-tsp-white-dark)]">
                <img
                  className="w-5 h-5"
                  alt="Component"
                  src="/component-1-31.svg"
                />
              </div>
            </div>

            {/* Browser info section */}
            <div className="flex items-center gap-2 w-full">
              <div className="w-10 h-10 items-center justify-center p-1.5 bg-[var(--fill-tsp-white-dark)] rounded-lg flex">
                <img
                  className="w-7 h-7"
                  alt="Component"
                  src="/component-1-47.svg"
                />
              </div>

              <div className="flex flex-col items-start gap-1 flex-1">
                <div className="w-full">
                  <p className="[font-family:'Inter',Helvetica] font-normal text-[11.1px] leading-[18px]">
                    <span className="text-[var(--text-secondary)]">Manus is using </span>
                    <span className="text-white">Terminal</span>
                  </p>
                </div>

                <Badge
                  className="flex items-center gap-[5.68e-14px] px-[11px] py-1 bg-[var(--fill-tsp-white-dark)] border-none rounded-full"
                  variant="outline"
                >
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[var(--text-secondary)] text-[12.1px] leading-[19.5px] whitespace-nowrap">
                    Executing command
                  </span>
                  <div className="pl-1 flex-1 overflow-hidden">
                    <div className="px-1">
                      <p className="[font-family:'Inter',Helvetica] font-normal text-[#8B9398] text-xs leading-[18px] truncate">
                        mkdir -p /home/ubuntu/tesla_analysis/data
                      </p>
                    </div>
                  </div>
                </Badge>
              </div>
            </div>

            {/* Terminal window */}
            <Card className="flex flex-col w-full bg-[var(--fill-tsp-white-main)] rounded-xl overflow-hidden border-none">
              {/* Terminal header */}
              <div className="flex h-9 items-center justify-center px-3 py-0 bg-[#242F3D] rounded-[12px_12px_0px_0px] border-b border-[#182533]">
                <div className="flex items-center justify-center flex-1">
                  <div className="w-[250px] overflow-hidden text-center">
                    <p className="font-medium text-[#8B9398] text-[13.6px] leading-5 whitespace-nowrap truncate [font-family:'Inter',Helvetica]">
                      shell1
                    </p>
                  </div>
                </div>
              </div>

              {/* Terminal content */}
              <div className="h-[567.5px] bg-[var(--fill-tsp-white-main)] overflow-auto">
                <div className="w-full h-full p-4 font-mono text-sm">
                  <p className="text-[#00ff00]">ubuntu@sandbox:~/tesla_analysis $</p>
                  <p className="text-white">cd /home/ubuntu && mkdir -p /home/ubuntu/tesla_analysis/data</p>
                  <p className="text-[#00ff00]">ubuntu@sandbox:~ $</p>
                </div>
              </div>

              {/* Browser footer with progress bar */}
              <div className="flex h-11 items-center gap-2 px-4 py-[10px] bg-[var(--fill-tsp-white-main)] border-t border-[#182533]">
                <div className="flex items-center">
                  <div className="w-6 h-6 py-1">
                    <img
                      className="w-4 h-4"
                      alt="Component"
                      src="/component-1-33.svg"
                    />
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center p-1">
                    <img
                      className="w-4 h-4"
                      alt="Component"
                      src="/component-1-46.svg"
                    />
                  </div>
                </div>

                <div className="flex-1 relative h-1">
                  <Progress
                    value={progressValue}
                    className="h-1 bg-[#182533] rounded-full"
                  />
                  <div className="absolute w-3.5 h-3.5 top-[-5px] left-[13px] bg-manusimazure-radiance rounded-full border-2 border-solid border-white" />
                </div>
              </div>
            </Card>

            {/* Input field at the bottom */}
            <div className="w-full h-[38px]">
              <Card className="flex justify-between items-start rounded-xl bg-[var(--fill-tsp-white-main)] border-none">
                <div className="flex items-center gap-2.5 px-4 py-2 w-full">
                  <img
                    className="w-4 h-4"
                    alt="Component"
                    src="/component-1-35.svg"
                  />
                  <div className="flex-1">
                    <p className="[font-family:'Inter',Helvetica] font-normal text-[var(--text-primary)] text-[12.8px] leading-5 whitespace-nowrap">
                      Provide public URL for Tesla stock analysis dashboard
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2.5 px-[13px]">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#8B9398] text-[10.9px] leading-4 whitespace-nowrap">
                    14 / 14
                  </span>
                  <img 
                    className="w-4 h-4"
                    alt="Component"
                    src="/component-6.svg"
                  />
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
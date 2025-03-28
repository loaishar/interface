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
    <div className="flex flex-col items-start px-6 py-6 h-[calc(100vh-52px)]">
      <div className="flex flex-col w-full items-start justify-center px-0 py-3">
        <Card className="w-full rounded-[22px] border border-solid border-[#0000000f] shadow-sm">
          <CardContent className="flex flex-col items-start gap-3 p-4">
            {/* Header with computer name */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <h3 className="font-manus-im-inter-semi-bold text-manusimdune text-lg">
                  Manus&#39;s Computer
                </h3>
              </div>
              <div className="flex w-7 h-7 items-center justify-center p-1 rounded-md">
                <img
                  className="w-5 h-5"
                  alt="Component"
                  src="/component-1-31.svg"
                />
              </div>
            </div>

            {/* Browser info section */}
            <div className="flex items-center gap-2 w-full">
              <div className="w-10 h-10 items-center justify-center p-1.5 bg-[#37352f14] rounded-lg flex">
                <img
                  className="w-7 h-7"
                  alt="Component"
                  src="/component-1-47.svg"
                />
              </div>

              <div className="flex flex-col items-start gap-1 flex-1">
                <div className="w-full">
                  <p className="[font-family:'Inter',Helvetica] font-normal text-[11.1px] leading-[18px]">
                    <span className="text-[#858481]">Manus is using </span>
                    <span className="text-[#535350]">Browser</span>
                  </p>
                </div>

                <Badge
                  className="flex items-center gap-[5.68e-14px] px-[11px] py-1 bg-manusimdune-4 border border-solid border-[#0000000a] rounded-full"
                  variant="outline"
                >
                  <span className="[font-family:'Inter',Helvetica] font-normal text-manusimfuscous-gray text-[12.1px] leading-[19.5px] whitespace-nowrap">
                    Browsing
                  </span>
                  <div className="pl-1 flex-1 overflow-hidden">
                    <div className="px-1">
                      <p className="[font-family:'Inter',Helvetica] font-normal text-manusimfriar-gray text-xs leading-[18px] truncate">
                        {currentUrl}
                      </p>
                    </div>
                  </div>
                </Badge>
              </div>
            </div>

            {/* Browser window */}
            <Card className="flex flex-col w-full bg-manusimdesert-storm rounded-xl overflow-hidden border border-solid border-[#0000001f] shadow-[0px_4px_32px_#0000000a]">
              {/* Browser header */}
              <div className="flex h-9 items-center justify-center px-3 py-0 bg-manusimdesert-storm rounded-[12px_12px_0px_0px] border-b border-[#0000000f] shadow-[inset_0px_1px_0px_#ffffff]">
                <div className="flex items-center justify-center flex-1">
                  <div className="w-[250px] overflow-hidden text-center">
                    <p className="font-medium text-manusimfriar-gray text-[13.6px] leading-5 whitespace-nowrap truncate [font-family:'Inter',Helvetica]">
                      {currentUrl.substring(0, 35)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Browser content */}
              <div className="h-[567.5px] bg-manusimwhite overflow-auto">
                <div className="w-full h-full bg-[url(/image-preview.png)] bg-cover bg-[50%_50%]" />
              </div>

              {/* Browser footer with progress bar */}
              <div className="flex h-11 items-center gap-2 px-4 py-[10px] bg-manusimwhite border-t border-[#0000000f]">
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
                    className="h-1 bg-manusimdune-8 rounded-full"
                  />
                  <div className="absolute w-3.5 h-3.5 top-[-5px] left-[13px] bg-manusimazure-radiance rounded-full border-2 border-solid border-white" />
                </div>
              </div>
            </Card>

            {/* Input field at the bottom */}
            <div className="w-full h-[38px]">
              <Card className="flex justify-between items-start rounded-xl border border-solid">
                <div className="flex items-center gap-2.5 px-4 py-2 w-full">
                  <img
                    className="w-4 h-4"
                    alt="Component"
                    src="/component-1-35.svg"
                  />
                  <div className="flex-1">
                    <p className="[font-family:'Inter',Helvetica] font-normal text-manusimdune text-[12.8px] leading-5 whitespace-nowrap">
                      Review and send final report to user
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2.5 px-[13px]">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-manusimfriar-gray text-[10.9px] leading-4 whitespace-nowrap">
                    8 / 8
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
  );
};

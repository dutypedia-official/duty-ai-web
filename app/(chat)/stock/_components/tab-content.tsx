"use client";
import ChatMain from "@/components/chat/chatMain";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import MarketOverview from "./market-overview";
import useUi from "@/lib/hooks/useUi";
import useChat from "@/lib/hooks/useChat";
import { cn } from "@/lib/utils";

export const TabContent = ({ open, setOpen }: any) => {
  const isLargerScreen = useMediaQuery("(min-width: 1536px)");
  const { chatMiniSlide, setChatMiniSlide } = useChat();
  const { activeTab, setActiveTab } = useUi();
  const tabs = [
    {
      name: "index",
      label: "Index",
    },
    {
      name: "aiChat",
      label: "AI chat",
    },
  ];
  console.log(isLargerScreen);
  return isLargerScreen ? (
    <div className="w-full max-w-full sm:max-w-[28rem]">
      <div className="overflow-y-auto bg-card-foreground max-h-[calc(100vh-6.5rem)] rounded-lg w-full border dark:border-[#2F2525]">
        <div className="flex justify-center py-5 sticky top-0 bg-card-foreground z-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 border border-[#B0BEC5] dark:border-[#333333] text-white font-normal text-base ${
                tab?.name === activeTab
                  ? "bg-[#00796B]"
                  : "bg-[#E0E0E0] dark:bg-[#333333]"
              }`}
              onClick={() => setActiveTab(tab?.name)}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <div className={cn("", { hidden: activeTab !== "index" })}>
            <MarketOverview />
          </div>
          <div className={cn("", { hidden: activeTab !== "aiChat" })}>
            <ChatMain mini={true} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Sheet onOpenChange={setChatMiniSlide} open={chatMiniSlide}>
      <SheetTrigger asChild>
        <div className="fixed right-0 top-0 h-screen flex items-center justify-center">
          <div
            onMouseEnter={() => setChatMiniSlide(true)}
            onClick={() => setChatMiniSlide(true)}
            className="h-44 bg-[#00B0FF] flex items-center justify-center rounded-l-xl">
            <FaCaretLeft className="text-white" />
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 w-full max-w-full sm:max-w-[28rem] rounded-none">
        <div className="absolute z-10 h-screen flex items-center justify-center left-5 sm:left-0">
          <div
            onClick={() => {
              setChatMiniSlide(false);
            }}
            className="h-44 z-20 flex items-center bg-[#00B0FF] rounded-l-xl -translate-x-4">
            <FaCaretRight className="text-white" />
          </div>
        </div>
        <ScrollArea className="h-screen overflow-y-auto">
          <div className="bg-card-foreground h-full rounded-lg w-full">
            <div className="flex justify-center py-5 sticky top-0 bg-card-foreground z-10">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border border-[#B0BEC5] dark:border-[#333333] text-white font-normal text-base ${
                    tab?.name === activeTab
                      ? "bg-[#00796B]"
                      : "bg-[#E0E0E0] dark:bg-[#333333]"
                  }`}
                  onClick={() => setActiveTab(tab?.name)}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={cn(activeTab !== "aiChat" && "mt-4")}>
              {/* Render the content based on the active tab */}
              <div className={cn(activeTab !== "index" ? "hidden" : "")}>
                <MarketOverview />
              </div>
              <div className={cn(activeTab !== "aiChat" ? "hidden" : "")}>
                <ChatMain mini={true} slide={true} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

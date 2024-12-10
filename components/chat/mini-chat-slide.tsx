"use client";
import ChatMain from "@/components/chat/chatMain";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import useUi from "@/lib/hooks/useUi";
import useChat from "@/lib/hooks/useChat";
import { cn } from "@/lib/utils";

export const MiniChatSlide = () => {
  const isLargerScreen = useMediaQuery("(min-width: 1536px)");
  const { chatMiniSlide, setChatMiniSlide } = useChat();
  const { activeTab, setActiveTab } = useUi();

  return isLargerScreen ? (
    <div className="w-full max-w-full sm:max-w-[28rem]">
      <div className="overflow-y-auto bg-card-foreground max-h-[calc(100vh-6.5rem)] rounded-lg w-full border dark:border-[#2F2525]">
        <div className="mt-4">
          <div className={cn("h-full w-full")}>
            <ChatMain mini={true} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Sheet onOpenChange={setChatMiniSlide} open={chatMiniSlide}>
      {/* <SheetTrigger asChild>
        <div className="fixed right-0 top-0 h-screen flex items-center justify-center">
          <div
            onMouseEnter={() => setChatMiniSlide(true)}
            onClick={() => setChatMiniSlide(true)}
            className="h-44 bg-[#00B0FF] flex items-center justify-center rounded-l-xl">
            <FaCaretLeft className="text-white" />
          </div>
        </div>
      </SheetTrigger> */}
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
            <div className={cn("w-full h-full")}>
              <div className={cn("w-full h-full")}>
                <ChatMain mini={true} slide={true} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

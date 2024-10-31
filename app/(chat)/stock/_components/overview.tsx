"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import MarketOverview from "./market-overview";

export const Overview = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <div className="fixed right-0 top-0 h-screen flex items-center justify-center">
          <div className="h-44 bg-[#00B0FF] flex items-center justify-center rounded-l-xl">
            <FaCaretLeft className="text-[#757575] dark:text-white" />
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 w-full max-w-full sm:max-w-[28rem] rounded-none">
        <div className="absolute z-10 h-screen flex items-center justify-center">
          <div
            onClick={() => {
              setOpen(false);
            }}
            className="h-44 z-20 flex items-center bg-[#00B0FF] rounded-l-xl -translate-x-4">
            <FaCaretRight className="text-[#757575] dark:text-white" />
          </div>
        </div>
        <ScrollArea className="h-screen">
          <MarketOverview sidebar={true} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

"use client";
import ChatMain from "@/components/chat/chatMain";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { FaCaretRight } from "react-icons/fa";

export const StockChatMini = ({ open, setOpen }: any) => {
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent className="p-0 w-full max-w-full sm:max-w-[28rem] rounded-none">
        <div className="absolute z-10 h-screen flex items-center justify-center">
          <div
            onMouseEnter={() => setOpen(false)}
            onClick={() => {
              setOpen(false);
            }}
            className="h-44 z-20 flex items-center bg-card-foreground rounded-l-xl -translate-x-4">
            <FaCaretRight className="text-[#757575] dark:text-white" />
          </div>
        </div>
        <ScrollArea className="h-screen">
          <ChatMain mini={true} slide={true} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

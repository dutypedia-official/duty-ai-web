"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useState } from "react";
import { FaCaretDown, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import MarketOverview from "./market-overview";

export const Overview = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (isDesktop) {
    return (
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger onMouseEnter={() => setOpen(true)}>
          <div className="h-44 bg-card-foreground flex items-center justify-center rounded-l-xl">
            <FaCaretLeft className="text-[#757575] dark:text-white" />
          </div>
        </SheetTrigger>
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
            <MarketOverview sidebar={true} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <Drawer onOpenChange={setOpen} open={open}>
        <DrawerTrigger>
          <div className="h-44 bg-card-foreground flex items-center justify-center rounded-l-xl">
            <FaCaretLeft className="text-[#757575] dark:text-white" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-card-foreground">
          <DrawerClose className="absolute w-full h-10 bg-card-foreground flex items-center justify-center">
            <div className="w-full h-full bg-card-foreground flex items-center justify-center rounded-l-xl">
              <FaCaretDown className="text-[#757575] dark:text-white -translate-y-2" />
            </div>
          </DrawerClose>
          <ScrollArea className="h-[calc(100vh-30vh)]">
            <MarketOverview sidebar={true} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }
};

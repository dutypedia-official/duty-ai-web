"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import MarketOverview from "./market-overview";

export const Overview = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (isDesktop) {
    return (
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger onMouseEnter={() => setOpen(true)}>
          <div className="h-44 bg-card flex items-center justify-center rounded-l-xl">
            <FaCaretLeft className="text-[#757575] dark:text-white" />
          </div>
        </SheetTrigger>
        <SheetContent className="p-0 w-full max-w-full sm:max-w-[28rem] rounded-none">
          <SheetClose
            onMouseLeave={() => setOpen(false)}
            className="h-44 bg-card flex items-center justify-center rounded-l-xl"
          />
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
          <div className="h-44 bg-card flex items-center justify-center rounded-l-xl">
            <FaCaretLeft className="text-[#757575] dark:text-white" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-card">
          <ScrollArea className="h-[calc(100vh-30vh)]">
            <MarketOverview sidebar={true} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }
};

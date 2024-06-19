"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "@/components/global/mobileNav";
import { Menu } from "lucide-react";

export const MobileMenuSlide = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="cursor-pointer w-7 h-7" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-background border-none p-0 w-80 block lg:hidden">
        <MobileNav />
      </SheetContent>
    </Sheet>
  );
};

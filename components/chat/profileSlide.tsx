"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileNav } from "@/components/global/mobileNav";

export const ProfileSlide = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-foreground text-background border-none p-0 w-80 block lg:hidden">
        <MobileNav />
      </SheetContent>
    </Sheet>
  );
};

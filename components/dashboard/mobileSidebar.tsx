"use client";

import useNav from "@/lib/hooks/useNav";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import IconBar from "@/components/dashboard/iconBar";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
  const { isShowNav, openNav } = useNav();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isShowNav === false) {
      openNav();
    }
  }, [visible]);

  return (
    <Sheet open={visible} onOpenChange={setVisible}>
      <SheetTrigger className="flex lg:hidden">
        <Menu className={cn("w-7 h-7 cursor-pointer")} />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-background border-none p-0 w-max lg:hidden flex gap-0"
      >
        <IconBar isMobile={true} />
      </SheetContent>
    </Sheet>
  );
};

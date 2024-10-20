"use client";

import ProfileMenu from "@/components/global/profileMenu";
import useNav from "@/lib/hooks/useNav";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MobileSidebar from "../chat/mobileSidebar";
import { ModeToggle } from "../modeToggle";

export const TopSidebar = () => {
  const { closeNav, openNav, isShowNav } = useNav();
  return (
    <div className="sticky top-0 h-16 z-20 px-4 bg-[#fff] dark:bg-[#1f1f1f] backdrop-blur-md w-full lg:shadow-sm flex items-center">
      <div className="w-full flex items-center justify-between">
        <MobileSidebar />

        <div className="">
          <Menu
            className={cn("w-7 h-7 cursor-pointer", "hidden lg:flex")}
            onClick={isShowNav ? closeNav : openNav}
          />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

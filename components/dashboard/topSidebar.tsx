"use client";

import ProfileMenu from "@/components/global/profileMenu";
import useNav from "@/lib/hooks/useNav";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MobileSidebar from "../chat/mobileSidebar";

export const TopSidebar = () => {
  const { closeNav, openNav, isShowNav } = useNav();
  return (
    <div className="sticky top-0 h-16 z-20 p-4 bg-background/70 backdrop-blur-md w-full lg:shadow-sm">
      <div className="w-full flex justify-between">
        <MobileSidebar />

        <div className="">
          <Menu
            className={cn("w-7 h-7 cursor-pointer", "hidden lg:flex")}
            onClick={isShowNav ? closeNav : openNav}
          />
        </div>
        <div className="">
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

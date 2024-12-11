"use client";

import ProfileMenu from "@/components/global/profileMenu";
import useNav from "@/lib/hooks/useNav";
import { cn } from "@/lib/utils";
import { ChevronLeft, Menu } from "lucide-react";
import MobileSidebar from "../chat/mobileSidebar";
import { ModeToggle } from "../modeToggle";
import { TopNoti } from "@/app/(chat)/stock/_components/top-noti";
import useChat from "@/lib/hooks/useChat";

export const TopSidebar = () => {
  const { closeNav, openNav, isShowNav } = useNav();
  const { template, setTemplate, setActiveConversationId } = useChat();
  return (
    <div
      className={cn(
        "sticky top-0 h-16 z-20 px-4 bg-[#fff] dark:bg-[#1f1f1f] backdrop-blur-md w-full lg:shadow-sm flex items-center",
        template === "scanner" &&
          "bg-transparent dark:bg-transparent backdrop-blur-0 shadow-none"
      )}>
      <div className="w-full flex items-center justify-between">
        {template !== "scanner" && <MobileSidebar />}

        <div className="">
          {template === "scanner" ? (
            <ChevronLeft
              onClick={() => {
                setTemplate("finance");
                setActiveConversationId(null);
              }}
              className={cn(
                "w-7 h-7 cursor-pointer flex bg-[#00A6A6] text-white rounded-full"
              )}
            />
          ) : (
            <Menu
              className={cn("w-7 h-7 cursor-pointer", "hidden lg:flex")}
              onClick={isShowNav ? closeNav : openNav}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <TopNoti />
          <ModeToggle />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

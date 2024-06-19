"use client";
import { ListPlus, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import IconBar from "@/components/dashboard/iconBar";
import { Button } from "@/components/ui/button";
import { LeftNav } from "@/components/chat/leftNav";
import useDashboard from "@/lib/hooks/useDashboard";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const dashboardStore = useDashboard();
  const { showMobileSidebar, setShowMobileSidebar } = dashboardStore;
  const [menuVisible, setMenuVisible] = useState(true);

  return (
    <Sheet open={showMobileSidebar} onOpenChange={setShowMobileSidebar}>
      {menuVisible && (
        <SheetTrigger className="lg:hidden w-10 h-10 bg-background border rounded-full flex justify-center items-center">
          <Menu className="cursor-pointer w-5 h-5" />
        </SheetTrigger>
      )}
      <SheetContent
        side={"left"}
        className="bg-background border-none p-0 w-max lg:hidden flex gap-0"
      >
        <IconBar isMobile={true} />
        <div
          className={`h-screen py-4 flex-shrink-0 duration-300 border-r bg-accent w-80`}
        >
          <div className={`h-full rounded-md overflow-hidden`}>
            <div className="px-3">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full gap-2"
              >
                <ListPlus />
                New Chat
              </Button>
            </div>
            <LeftNav onDelete={() => {}} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

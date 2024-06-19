"use client";

import CompleteLogo from "@/components/icons/CompleteLogo";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LogOut, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";

export const ChatSlide = ({ data }: any) => {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="cursor-pointer w-5 h-5" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-background text-foreground border-none p-0 w-80 flex lg:hidden flex-col">
        <div className="">
          <h1 className="text-2xl font-bold w-full inline-flex items-center justify-center py-5">
            <CompleteLogo className={cn("w-44 h-7 text-brand")} />
          </h1>
          <div className="text-background h-full flex flex-col justify-between">
            <ScrollArea className="h-[calc(100vh-134px)] px-5">
              {data.map((item: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="text-foreground hover:bg-accent flex-shrink-0 flex-grow inline-flex flex-nowrap items-center justify-between p-3 rounded-md w-full cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-7">
                        <User className="w-5 h-5" />
                      </div>
                      <div
                        className={`text-sm flex-1 overflow-hidden line-clamp-1`}>
                        {item?.label}
                      </div>
                    </div>
                    {item?.badge && (
                      <Badge className="bg-blue-500 hover:bg-blue-500 uppercase rounded cursor-pointer">
                        {item?.badge}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/");
          }}
          className="flex justify-between items-center w-full bg-accent p-5 absolute bottom-0 cursor-pointer">
          <div className="text-sm font-medium">Log out</div>
          <LogOut className="w-5 h-5" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "date-fns";

export const TopNoti = () => {
  const data = [
    {
      symbol: "/symbol.svg",
      title: "GP আজকের এনালাইসিস  ⭐ ",
      subtitle:
        "বাজার খোলার আগে আপনার স্টক বিশ্লেষণ চেক করুন। এখনই ডিউটি এআই থেকে ভবিষ্যদ্বাণী নিন!",
      createdAt: "2009-04-30 09:44:35",
    },
    {
      symbol: "",
      title: "GP আজকের এনালাইসিস  ⭐ ",
      subtitle:
        "বাজার খোলার আগে আপনার স্টক বিশ্লেষণ চেক করুন। এখনই ডিউটি এআই থেকে ভবিষ্যদ্বাণী নিন!",
      createdAt: "2009-04-30 09:44:35",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-10 h-10 flex flex-col items-center justify-center">
          <Bell className="w-5 h-5 text-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-card p-3 rounded-xl gap-[10px]"
        align="end"
        forceMount>
        {data?.map((item, i) => {
          return (
            <DropdownMenuLabel
              key={i}
              className="font-normal bg-card hover:bg-background p-3 rounded-md flex flex-1">
              <div className="w-8 h-full mr-1">
                <Avatar className="w-8 h-8 aspect-square">
                  <AvatarImage src={item?.symbol} alt={"symbol"} />
                  <AvatarFallback className="w-8 h-8 aspect-square bg-background">
                    S
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-1">
                <h1 className="text-[14px] text-[#87CEEB] font-bold">
                  {item?.title}
                </h1>
                <p className="text-[12px] text-[#D3D3D3]">{item?.subtitle}</p>
                <p className="text-[10px] text-[#5C5C5C] text-right">
                  {formatDate(item.createdAt, "dd/MM/yyy p")}
                </p>
              </div>
            </DropdownMenuLabel>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

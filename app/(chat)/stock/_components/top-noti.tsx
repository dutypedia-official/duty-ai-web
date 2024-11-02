"use client";
import React, { useEffect, useState } from "react";
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
import { formatDate, setDate } from "date-fns";
import { NotificationSlide } from "./notification-slide";
import useUi from "@/lib/hooks/useUi";
import { apiClient } from "@/lib/api";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export const TopNoti = () => {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState([]);
  const { refreash, setRefreash, mainServerAvailable } = useUi();
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<any>();
  const [open, setOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const { getToken } = useAuth();
  const client = apiClient();

  const fetchData = async () => {
    try {
      const token = await getToken();
      const { data } = await client.get(
        "/noti/get-all/1",
        token,
        {}
        // mainServerAvailable
      );
      console.log(data);
      setRefreash(!refreash);
      setNotifications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="w-10 h-10 flex flex-col items-center justify-center cursor-pointer">
            <Bell className="w-5 h-5 text-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80 max-h-96 overflow-y-scroll bg-card p-3 rounded-xl gap-[10px]"
          align="end"
          forceMount>
          {notifications.length == 0 ? (
            <div className="">
              <p className="text-sm text-center text-[#D3D3D3]">
                No notifications
              </p>
            </div>
          ) : (
            notifications?.map((item: any, i: number) => {
              return (
                <DropdownMenuLabel
                  key={i}
                  onClick={() => {
                    if (item?.type === "analysis") {
                      setSlideOpen(true);
                      setId(item?.entityId);
                    }
                  }}
                  className="cursor-pointer font-normal bg-card hover:bg-background p-3 rounded-md flex flex-1">
                  <div className="w-8 h-full mr-1">
                    <Avatar className="w-8 h-8 aspect-square">
                      <AvatarImage src={item?.symbol} alt={"symbol"} />
                      <AvatarFallback className="w-8 h-8 aspect-square bg-background">
                        {`${Array.from(item?.companyName)[0]}`}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h1 className="text-[14px] text-[#87CEEB] font-bold">
                      {item?.companyName}
                    </h1>
                    <p className="text-[12px] text-[#D3D3D3] line-clamp-2">
                      {item?.message}
                    </p>
                    <div
                      className={cn(
                        "flex justify-end gap-5",
                        item?.type === "analysis" && "justify-between"
                      )}>
                      <p className="text-[10px] text-[#5C5C5C] line-clamp-2 w-full">
                        {formatDate(item.createdAt, "dd/MM/yyy p")}
                      </p>
                      {item?.type === "analysis" && (
                        <button
                          onClick={() => {
                            if (item?.type === "analysis") {
                              setSlideOpen(true);
                              setId(item?.entityId);
                            }
                          }}
                          className="text-[12px] text-[#5C5C5C]">
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
              );
            })
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <NotificationSlide
        open={slideOpen}
        setOpen={setSlideOpen}
        entityId={id}
      />
    </>
  );
};

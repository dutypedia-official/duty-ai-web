"use client";

import { Check, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { apiClient, deleteConversation, getConversations } from "@/lib/api";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import useChat from "@/lib/hooks/useChat";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";

interface LeftNavProps {
  onDelete: () => void;
}

export const LeftNav = ({ onDelete }: LeftNavProps) => {
  const chatStore = useChat();
  const { getToken } = useAuth();
  const { activeConversationId, setActiveConversationId } = chatStore;
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState<any>([]);
  const client = apiClient();

  const fetchConversations = async (initial: boolean = true) => {
    try {
      const token = await getToken();
      if (initial) setIsLoading(true);
      const { data } = await client.get("/messages/conv/get-all", token);
      setConversations(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelDelete = async (id: string) => {
    const userAction = confirm(
      "Are you sure you want to delete this conversation?"
    );
    if (!userAction) return;
    try {
      const token = await getToken();
      await client.delete(`/messages/conv/delete/${id}`, token);
      onDelete();
      fetchConversations(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!activeConversationId) {
      fetchConversations();
    }
  }, []);

  useEffect(() => {
    if (activeConversationId) {
      fetchConversations(false);
    }
  }, [activeConversationId]);

  if (isLoading) {
    return (
      <div className="px-4 py-4 space-y-6">
        {Array.from(Array(7).keys()).map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-card" />
            <Skeleton className="h-4 w-[200px] bg-card" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="h-full pb-4">
        {/* <p className="uppercase font-semibold text-sm text-muted-foreground py-2">
          Today
        </p> */}
        {!activeConversationId && (
          <div
            className={`py-3 w-full cursor-pointer border border-l-0 border-r-0`}>
            <div className="w-full group px-2 flex items-center justify-between gap-3">
              <div className="flex flex-1 items-center justify-between gap-3">
                <div className="w-5">
                  <Check className={cn("w-5 h-5 opacity-100")} />
                </div>
                <div
                  className={cn(
                    "text-sm text-brand flex-1 overflow-hidden line-clamp-2 font-semibold break-all"
                  )}>
                  Untitled
                </div>
              </div>
            </div>
          </div>
        )}
        {conversations?.map((item: any, i: number) => {
          return (
            <div
              key={i}
              className={`py-3 w-full cursor-pointer ${
                activeConversationId === item.id
                  ? "border border-l-0 border-r-0"
                  : ""
              }`}>
              <div className="w-full group px-2 flex items-center justify-between gap-3">
                <div
                  onClick={() => {
                    if (activeConversationId !== item.id) {
                      setActiveConversationId(item.id);
                    }
                  }}
                  className="flex flex-1 items-center justify-between gap-3">
                  <div className="w-5">
                    {activeConversationId === item.id ? (
                      <Check
                        className={cn(
                          "w-5 h-5 opacity-10",
                          activeConversationId === item.id && "opacity-100"
                        )}
                      />
                    ) : (
                      <span
                        className={cn(
                          "opacity-10 group-hover:opacity-100 flex-shrink-0",
                          activeConversationId === item.id && "opacity-100"
                        )}>
                        {/* {i + 1} */}
                      </span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "text-sm font-medium text-muted-foreground flex-1 overflow-hidden group-hover:font-semibold break-all",
                      activeConversationId === item.id &&
                        "font-semibold text-brand"
                    )}>
                    <p className="line-clamp-1 ">{item?.name}</p>
                    <p className="text-xs text-muted-foreground/50">
                      {moment(item?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
                <a
                  className={cn(
                    "opacity-10 dark:opacity-50 text-foreground flex-shrink-0",
                    activeConversationId === item.id &&
                      "opacity-100 dark:opacity-100"
                  )}
                  onClick={() => handelDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

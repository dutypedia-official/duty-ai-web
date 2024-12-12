"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import AuthPage from "@/components/global/auth-page";
import useSocket from "@/lib/hooks/useSocket";
import useUi from "@/lib/hooks/useUi";
import { useUser } from "@clerk/nextjs";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const { connect, socket } = useSocket();
  const { setRefreash, refreash } = useUi();
  const { user } = useUser();

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.on(`new-noti-${user.id}`, () => {
        toast({
          title: "New Notification",
          description: "You have a new notification",
        });
        console.log("New noti...");
        setRefreash(!refreash);
      });
    }
    return () => {
      if (socket) {
        socket.off(`new-noti`);
      }
    };
  }, [socket, user]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <AuthPage />
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;

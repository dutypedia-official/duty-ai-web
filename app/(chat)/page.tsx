"use client";
import ChatMain from "@/components/chat/chatMain";
import { LandingPage } from "@/components/landing";
import useChat from "@/lib/hooks/useChat";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { isSignedIn } = useAuth();
  const chatStore = useChat();
  const { setTemplate } = chatStore;

  useEffect(() => {
    setTemplate("general");
  }, []);

  return isSignedIn ? <ChatMain /> : <LandingPage />;
}

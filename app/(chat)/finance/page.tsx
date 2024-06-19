"use client";

import ChatMain from "@/components/chat/chatMain";
import useChat from "@/lib/hooks/useChat";
import { useEffect } from "react";

export default function Page() {
  const chatStore = useChat();
  const { setTemplate } = chatStore;

  useEffect(() => {
    setTemplate("finance");
    return () => {
      setTemplate("general");
    };
  }, []);

  return <ChatMain />;
}

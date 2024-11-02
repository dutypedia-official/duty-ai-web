"use client";
import ChatMain from "@/components/chat/chatMain";
import { GoldenChoice } from "@/components/goldenChoice/golden-choice";
import { LandingPage } from "@/components/landing";
import useChat from "@/lib/hooks/useChat";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { isSignedIn } = useAuth();
  const chatStore = useChat();
  const { setTemplate, openGolden, setOpenGolden } = chatStore;

  useEffect(() => {
    setTemplate("finance");
    return () => {
      setTemplate("general");
    };
  }, []);

  useEffect(() => {
    setOpenGolden(false);
  }, []);

  return isSignedIn ? (
    <>
      <ChatMain />
      <GoldenChoice open={openGolden} setOpen={setOpenGolden} />
    </>
  ) : (
    <LandingPage />
  );
}

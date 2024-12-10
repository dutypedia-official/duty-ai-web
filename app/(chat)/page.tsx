"use client";
import ChatMain from "@/components/chat/chatMain";
import { MiniChatSlide } from "@/components/chat/mini-chat-slide";
import { GoldenChoice } from "@/components/goldenChoice/golden-choice";
import { ProcessingDialog } from "@/components/goldenChoice/processing-dialog";
import { VideoDialog } from "@/components/goldenChoice/video-dialog";
import { ViewMoreDialog } from "@/components/goldenChoice/view-more";
import { WinDialog } from "@/components/goldenChoice/win-dialog";
import { LandingPage } from "@/components/landing";
import useChat from "@/lib/hooks/useChat";
import useVipSignal from "@/lib/hooks/useVipSignal";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { isSignedIn } = useAuth();
  const chatStore = useChat();
  const {
    setTemplate,
    template,
    openGolden,
    processingModal,
    winModal,
    videoModal,
    setVideoModal,
    viewMore,
  } = chatStore;

  const { clearSelectStock, setAnswer, setDetails } = useVipSignal();

  useEffect(() => {
    setTemplate("finance");
    return () => {
      setTemplate("general");
    };
  }, []);

  useEffect(() => {
    if (openGolden === false) {
      clearSelectStock(), setAnswer(null), setDetails(null);
    }
  }, [openGolden]);

  return isSignedIn ? (
    <>
      <ChatMain />
      {template === "scanner" && <MiniChatSlide />}
      <VideoDialog open={videoModal} setOpen={setVideoModal} />
      {openGolden && <GoldenChoice />}
      {processingModal && <ProcessingDialog />}
      {winModal && <WinDialog />}
      {viewMore && <ViewMoreDialog />}
    </>
  ) : (
    <LandingPage />
  );
}

"use client";

import useChat from "@/lib/hooks/useChat";
import { ElementRef, useEffect, useRef, useState } from "react";

import { ChatMessage } from "./chatMessage";
import PopularPrompts from "./popularPrompts";
import { BeatLoader } from "react-spinners";
import { useInView } from "framer-motion";

export const ChatMessages = ({ mini = false }: { mini?: boolean }) => {
  const chatStore = useChat();
  const { isSubmiting, messages, activeConversationId } = chatStore;
  const scrollRef = useRef<ElementRef<"div">>(null);
  const messagesContainerRef = useRef<ElementRef<"div">>(null);
  const [scrollingUp, setScrollingUp] = useState(false);
  const isInView = useInView(scrollRef);

  useEffect(() => {
    if (scrollingUp) return;
    if (
      messages?.length == 0 ||
      messagesContainerRef?.current?.offsetHeight! < 300
    ) {
      window?.scrollTo(0, 0);
    } else {
      scrollRef?.current?.scrollIntoView({
        behavior: isSubmiting ? "instant" : "smooth",
      });
    }
  }, [messages, isSubmiting]);

  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop > lastScrollTop) {
        setScrollingUp(false);
      } else {
        setScrollingUp(true);
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (messages.length === 0 && !mini) {
    return <PopularPrompts />;
  }

  return (
    <div ref={messagesContainerRef} className="flex-1">
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          message={message}
          isLast={index === messages.length - 1}
        />
      ))}
      {isSubmiting && messages[0]?.id === activeConversationId && (
        <BeatLoader color="hsl(var(--primary))" size={5} />
      )}
      <div className="pb-5" ref={scrollRef} />
    </div>
  );
};

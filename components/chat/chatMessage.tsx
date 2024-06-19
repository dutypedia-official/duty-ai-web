"use client";

import { BeatLoader } from "react-spinners";
import { Copy, Pencil, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { giveFeedback } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import FeedbackModal from "./feedbackModal";
import ChatEnhance from "./chatEnhance";
import useChat from "@/lib/hooks/useChat";
import RelatedPrompts from "./relatedPrompts";

export interface ChatMessageProps {
  role: "system" | "user";
  query?: string;
  template?: string;
  text?: string;
  answer?: string;
  sources?: string[];
  model?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  totalCost?: number;
  id?: string;
  feedback?: {
    react: "like" | "dislike";
  } | null;
  isLoading?: boolean;
  user?: {
    _id: number;
    name: "human" | "ai";
  };
}

interface CProps {
  message: ChatMessageProps;
  isLast?: boolean;
}

export const ChatMessage = ({ isLast, message }: CProps) => {
  const { toast } = useToast();
  const chatStore = useChat();
  const { setPrompt, promptInputRef } = chatStore;
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [currentReact, setCurrentReact] = useState<"like" | "dislike" | null>(
    message.feedback?.react || null
  );
  const onCopy = () => {
    if (!message.answer) {
      return;
    }

    navigator.clipboard.writeText(message.answer);
    toast({
      description: "Message copied to clipboard.",
      duration: 3000,
    });
  };

  const handelFeedback = async (react: "like" | "dislike") => {
    if (!message.id) return;
    if (isBusy) return;
    try {
      setIsBusy(true);
      const { data } = await giveFeedback({
        messageId: message.id,
        react: react,
      });
      setCurrentReact(react);
      if (react == "dislike") {
        setShowFeedbackModal(data.id);
      } else {
        toast({
          title: "Success",
          description: "Thanks for your feedback!",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.msg ||
          "Can't give feedback! Please try again later.",
      });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group flex w-full sm:px-4",
          message.user?.name !== "human" && !isLast && "mb-6"
        )}
      >
        <div
          className={cn(
            "px-3 py-1.5 prose-sm max-w-0 min-w-full md:max-w-0 md:min-w-full",
            message.user?.name === "human" &&
              "bg-slate-200 rounded-t-xl font-medium",
            message.user?.name !== "human" &&
              "bg-background rounded-xl rounded-tl-none shadow"
          )}
        >
          {message.user?.name === "human" ? (
            <div className="">
              <Pencil
                onClick={() => {
                  setPrompt(message.text!);
                  promptInputRef?.current?.focus();
                }}
                className="w-3 h-3 mt-2 ml-2 float-right opacity-50 hover:opacity-100 cursor-pointer"
              />
              {message.text}
            </div>
          ) : !message.text ? (
            <BeatLoader color="hsl(var(--primary))" size={5} />
          ) : (
            <>
              <div className="float-right">
                <Button className="" onClick={onCopy} size="sm" variant="ghost">
                  <Copy className="w-3 h-3" />
                </Button>
                <>
                  {currentReact ? (
                    currentReact === "like" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="pointer-events-none"
                      >
                        <ThumbsUp className="w-3 h-3 text-blue-500" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="pointer-events-none"
                      >
                        <ThumbsDown className="w-3 h-3 text-destructive" />
                      </Button>
                    )
                  ) : (
                    <>
                      <Button
                        onClick={() => handelFeedback("like")}
                        className=""
                        size="sm"
                        variant="ghost"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        onClick={() => handelFeedback("dislike")}
                        className=""
                        size="sm"
                        variant="ghost"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </>
              </div>
              <ReactMarkdown>{message.text!}</ReactMarkdown>
              {isLast && <ChatEnhance message={message} />}
            </>
          )}
        </div>
      </div>
      {isLast && (
        <div className="mt-2">
          <RelatedPrompts message={message} />
        </div>
      )}
      {showFeedbackModal && <FeedbackModal messageId={message.id} />}
    </>
  );
};

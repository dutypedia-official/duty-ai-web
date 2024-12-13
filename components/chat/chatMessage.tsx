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
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { MiniChatSlide } from "./mini-chat-slide";
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
  const chatStore = useChat();
  const {
    setPrompt,
    promptInputRef,
    template,
    setTemplate,
    setChatMiniSlide,
    setChatMiniOpen,
    setSubmitPrompt,
    setPromptCompanyName,
    setActiveConversationId,
  } = chatStore;
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [currentReact, setCurrentReact] = useState<"like" | "dislike" | null>(
    message.feedback?.react || null
  );
  const onCopy = () => {
    if (!message.text) {
      return;
    }

    navigator.clipboard.writeText(message.text);
    toast.success("Text copied to clipboard");
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
        toast.success("Thank you for your feedback!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsBusy(false);
    }
  };

  const askAiFn = () => {
    setTemplate("scanner");
    setActiveConversationId(null);
    setPromptCompanyName("Grameenphone");
    setPrompt(`Grameenphone`);
    setSubmitPrompt(true);
    setChatMiniOpen(true);
    setChatMiniSlide(true);
  };
  return (
    <>
      <div
        className={cn(
          "group flex w-full sm:px-4",
          message.user?.name !== "human" && !isLast && "mb-6"
        )}>
        <div
          className={cn(
            "px-5 py-1.5 prose max-w-0 min-w-full md:max-w-0 md:min-w-full text-foreground",
            message.user?.name === "human" &&
              "bg-card-foreground rounded-t-xl font-medium",
            message.user?.name !== "human" &&
              "bg-card-foreground rounded-xl rounded-t-none shadow",
            template === "scanner" &&
              message.user?.name !== "human" &&
              "bg-[#F5F6F8] dark:bg-[#2A2D35] border-[#DADCE0] dark:border-[#33353A]",
            template === "scanner" &&
              message.user?.name === "human" &&
              "bg-[#DAE8F3] dark:bg-[#3A7CA5] border-[#B4C7D6] dark:border-[#5CAFE0]"
          )}>
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
                {/* <>
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
                </> */}
              </div>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-foreground" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-foreground" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h2 className="text-foreground" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-foreground" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="text-foreground font-medium"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-primary underline underline-offset-2"
                      {...props}
                    />
                  ),
                }}
                className={"text-foreground"}>
                {message.text!}
              </ReactMarkdown>
              {/* {template !== "scanner" && (
                <div className="float-right">
                  <Button
                    className=""
                    onClick={askAiFn}
                    size="sm"
                    variant="ghost">
                    Ask Ai
                  </Button>
                </div>
              )} */}
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

"use client";
import { LeftNav } from "@/components/chat/leftNav";
import { useEnterSubmit } from "@/lib/hooks/useEnterSubmit";
import useNav from "@/lib/hooks/useNav";
import {
  ChevronLeft,
  Dot,
  ListPlus,
  Loader2,
  Plus,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";
import { toast } from "@/components/ui/use-toast";
import { ChatMessageProps } from "@/components/chat/chatMessage";
import { ChatMessages } from "@/components/chat/chatMessages";
import {
  apiClient,
  createConversation,
  createMessage,
  getMessages,
} from "@/lib/api";
import { nanoid } from "nanoid";
import useChat from "@/lib/hooks/useChat";
import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import { TopSidebar } from "@/components/dashboard/topSidebar";
import { cn, duckSearch } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/nextjs";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useRouter } from "next/navigation";
import useUi from "@/lib/hooks/useUi";

export default function ChatMain({ mini = false }: { mini?: boolean }) {
  const { getToken } = useAuth();
  const [timeLeft, setTimeLeft] = useState(30);
  const { setAskAiShow } = useUi();

  const chatStore = useChat();
  const {
    template,
    prompt,
    setPrompt,
    promptCompanyName,
    activeConversationId,
    setActiveConversationId,
    submitPrompt,
    setSubmitPrompt,
    isSubmiting,
    setIsSubmiting,
    setIsAskingAi,
    setPromptInputRef,
    messages,
    setMessages,
    addMessage,
    updateMessage,
    removeMessage,
    setRelatedPrompts,
  } = chatStore;
  const { formRef, onKeyDown } = useEnterSubmit();
  const client = apiClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { openNav, closeNav, isShowNav } = useNav();
  const [isFetchingNewMessages, setIsFetchingNewMessages] = useState(false);
  const [streamedText, setStreamedText] = useState<string>("");
  const router = useRouter();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );
  const prepareHistory = (msgs: any) => {
    const h: any = [];
    msgs.forEach((message: any) => {
      if (message.user?.name == "ai") {
        h.push({
          ai: message.text,
        });
      } else if (message.user?.name == "human") {
        h.push({
          human: message.text,
        });
      }
    });
    return h;
  };

  const handelAbort = () => {
    if (controller) {
      controller.abort();
      setController(new AbortController());
    }
    setSubmitPrompt(false);
    setIsSubmiting(false);
    setPrompt("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    setTimeLeft(30);
    setIsSubmiting(true);
    setIsAskingAi(true);
    let tId = null;
    const userMessage: ChatMessageProps = {
      role: "user",
      user: {
        _id: 1,
        name: "human",
      },
      text: prompt,
      id: nanoid(),
    };
    addMessage(userMessage);
    const tmpQuery = prompt;
    setPrompt("");
    const botMessage: ChatMessageProps = {
      role: "system",
      text: "",
      user: {
        _id: 2,
        name: "ai",
      },
      id: nanoid(),
    };
    const token = await getToken();
    try {
      if (!activeConversationId) {
        const { data } = await client.post(
          "/messages/conv/new",
          {
            name: tmpQuery,
          },
          token
        );
        await client.post(
          "/messages/new",
          {
            text: tmpQuery,
            id: userMessage.id,
            name: "human",
            conversationId: data?.id,
          },
          token
        );
        setActiveConversationId(data.id);
        tId = data.id;
      } else {
        await client.post(
          "/messages/new",
          {
            text: tmpQuery,
            id: userMessage.id,
            name: "human",
            conversationId: activeConversationId,
          },
          token
        );
      }

      const url =
        template == "general"
          ? `${process.env.NEXT_PUBLIC_API_URL}/chat/pro`
          : template == "forex"
          ? `${process.env.NEXT_PUBLIC_API_URL}/chat/forex`
          : `${process.env.NEXT_PUBLIC_API_URL}/chat/finance`;

      addMessage(botMessage);

      let text = "";

      await fetchEventSource(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: tmpQuery,
          history: prepareHistory(messages),
          messageId: botMessage.id,
          conversationId: activeConversationId || tId,
          name: name,
        }),
        async onmessage(event) {
          setTimeLeft(0);
          if (event.data !== "[DONE]") {
            const data = event.data;

            text += JSON.parse(data).content;
            setStreamedText(text);
            updateMessage(botMessage.id!, {
              ...botMessage,
              text: text,
            });
          } else {
            const { data } = await client.post(
              "/tools/get-related-prompt",
              {
                query: tmpQuery,
                history: `${prepareHistory(messages).join("\n\n")}`,
              },
              token
            );
            console.log(data);

            setRelatedPrompts(data);
          }
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
        },
      });
    } catch (error: any) {
      if (error.name === "AbortError") {
      } else {
        console.log(error);
        removeMessage(botMessage.id!);
        toast({
          title: "Error",
          description:
            error.response?.data?.msg ||
            "Can't get the response! Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmiting(false);
      setSubmitPrompt(false);
      setIsAskingAi(false);
    }
  };

  const fetchMessages = async (id: string) => {
    if (!id) return;
    const token = await getToken();

    try {
      setIsFetchingNewMessages(true);
      const { data } = await client.get(`/messages/get-all/${id}`, token);
      const reversed = [...data].reverse();
      console.log("orig", data);

      setMessages(reversed);
      console.log("reversed", reversed);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingNewMessages(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    setActiveConversationId(null);
    setPrompt("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    setName(`${user.firstName} ${user.lastName}`);
  }, [user]);

  useEffect(() => {
    setRelatedPrompts([]);
    if (activeConversationId && !isSubmiting) {
      fetchMessages(activeConversationId);
    }
  }, [activeConversationId]);

  useEffect(() => {
    newChat();
  }, [template]);

  useEffect(() => {
    if (submitPrompt) {
      handleSubmit(new Event("submit") as any);
    }
  }, [submitPrompt]);

  useEffect(() => {
    setPromptInputRef(inputRef);
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 0.1;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [isSubmiting]);

  return (
    <>
      {!mini && (
        <div
          className={`hidden h-screen sticky top-0 pb-4 flex-shrink-0 lg:block duration-300 border-r shadow-sm bg-background ${
            isShowNav ? "w-80" : "w-0"
          }`}>
          <div className={`h-full rounded-md overflow-hidden`}>
            <div className="px-3 shadow-sm h-16 flex items-center justify-between bg-card-foreground">
              <h1 className="text-base font-medium">
                Chat -{" "}
                <span className="text-muted-foreground capitalize text-sm font-normal">
                  ({template})
                </span>
              </h1>
            </div>
            <div className="p-3">
              <Button
                onClick={newChat}
                size="lg"
                variant="outline"
                className="rounded-md gap-2 w-full bg-card-foreground">
                <ListPlus />
                New Chat
              </Button>
            </div>
            <LeftNav
              onDelete={() => {
                newChat();
              }}
            />
          </div>
        </div>
      )}
      <div
        tabIndex={0}
        className={cn(
          "w-full relative",
          mini
            ? "bg-card rounded-lg w-full lg:w-[28rem] overflow-auto h-[calc(100vh-6.5rem)]"
            : "flex-1"
        )}>
        {!mini && <TopSidebar />}
        <div className="w-full flex">
          <div className="flex-1 pt-3">
            <div
              className={cn(
                "w-full max-w-screen-md mx-auto",
                mini ? "min-h-[calc(100vh-12rem)]" : "min-h-[calc(100vh-64px)]"
              )}>
              {isFetchingNewMessages ? (
                <div className="p-4">
                  <BeatLoader color="hsl(var(--primary))" size={5} />
                </div>
              ) : (
                <div className="px-3 sm:px-0">
                  {mini && (
                    <div className="flex p-5 sticky top-0 bg-card/20 backdrop-blur-sm">
                      <div className="w-10">
                        <div
                          className="rounded-full shadow-md w-8 h-8 flex items-center justify-center cursor-pointer"
                          onClick={() => setAskAiShow(false)}>
                          <ChevronLeft className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-1 w-full flex items-center justify-center text-center">
                        <h1 className="line-clamp-1">{promptCompanyName}</h1>
                      </div>
                      <div className="w-10"></div>
                    </div>
                  )}
                  <ChatMessages mini={mini} />
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              ref={formRef}
              className={cn(
                "pb-5 px-4 sticky bottom-0 bg-transparent backdrop-blur-sm backdrop-saturate-200 w-full mx-auto"
              )}>
              <div className="flex w-full bg-card-foreground p-1.5 border border-brand rounded-[26px] gap-1.5 max-w-screen-md mx-auto">
                <div className="flex flex-1 items-end gap-1.5 md:gap-2">
                  {isSubmiting && (
                    <Loader2 className="w-10 h-10 p-2.5 text-muted-foreground animate-spin" />
                  )}

                  <Textarea
                    ref={inputRef}
                    disabled={isSubmiting}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    rows={1}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      isSubmiting
                        ? template == "general"
                          ? "Generating..."
                          : timeLeft > 0
                          ? `Fetching...${timeLeft.toFixed(1)}sec`
                          : `Answering...`
                        : template == "general"
                        ? "Ask anything"
                        : "Enter company name"
                    }
                    spellCheck={false}
                    autoComplete="off"
                    className="max-h-[25dvh] pl-2 py-2.5 w-full bg-transparent h-full resize-none  focus-within:outline-none sm:text-sm placeholder:text-muted-foreground"
                  />
                  {!isSubmiting && (
                    <Button
                      className="rounded-full w-10 h-10 p-0 flex-shrink-0 text-background bg-brand hover:bg-brand/70 hover:text-white"
                      variant="ghost"
                      type="submit"
                      disabled={isSubmiting}>
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                  {isSubmiting && (
                    <Button
                      onClick={handelAbort}
                      className="rounded-full w-10 h-10 p-0 flex-shrink-0"
                      type="button"
                      disabled={!isSubmiting}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

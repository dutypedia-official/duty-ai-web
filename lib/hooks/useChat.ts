import { ChatMessageProps } from "@/components/chat/chatMessage";
import { create } from "zustand";

interface ChatStore {
  llm?: "gpt-4" | "gpt-3.5";
  setLlm?: (llm: "gpt-4" | "gpt-3.5") => void;
  template: "general" | "scenario" | "finance" | "forex";
  setTemplate: (template: "general" | "scenario" | "finance" | "forex") => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  promptCompanyName: string;
  setPromptCompanyName: (companyName: string) => void;
  isSubmiting: boolean;
  setIsSubmiting: (isLoading: boolean) => void;
  isAskingAi: boolean;
  setIsAskingAi: (isAskingAi: boolean) => void;
  activeConversationId: string | null;
  setActiveConversationId: (conversationId: string | null) => void;
  submitPrompt: boolean;
  setSubmitPrompt: (submitPrompt: boolean) => void;
  promptInputRef: React.RefObject<HTMLTextAreaElement> | null;
  setPromptInputRef: (
    promptInputRef: React.RefObject<HTMLTextAreaElement> | null
  ) => void;
  messages: ChatMessageProps[];
  setMessages: (messages: ChatMessageProps[]) => void;
  relatedPrompts: string[];
  setRelatedPrompts: (prompts: string[]) => void;
  addMessage: (message: ChatMessageProps) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, message: ChatMessageProps) => void;
  chatMiniOpen: boolean;
  setChatMiniOpen: (chatMiniOpen: boolean) => void;
  chatMiniSlide: boolean;
  setChatMiniSlide: (chatMiniSlide: boolean) => void;
}

const useChat = create<ChatStore>((set, get) => ({
  llm: "gpt-3.5",
  setLlm: (llm) => set({ llm }),
  template: "general",
  setTemplate: (template) => set({ template }),
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),
  promptCompanyName: "",
  setPromptCompanyName: (companyName) =>
    set({ promptCompanyName: companyName }),
  isSubmiting: false,
  setIsSubmiting: (isSubmiting) => set({ isSubmiting }),
  isAskingAi: false,
  setIsAskingAi: (isAskingAi) => set({ isAskingAi }),
  activeConversationId: null,
  setActiveConversationId: (conversationId) =>
    set({ activeConversationId: conversationId }),
  submitPrompt: false,
  setSubmitPrompt: (submitPrompt) => set({ submitPrompt }),
  promptInputRef: null,
  setPromptInputRef: (promptInputRef) => set({ promptInputRef }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set({ messages: [...(get().messages || []), message] }),
  removeMessage: (id) =>
    set({ messages: get().messages.filter((message) => message.id !== id) }),
  updateMessage: (id, message) => {
    const messages = get().messages.map((m) =>
      m.id === id ? { ...m, ...message } : m
    );
    set({ messages });
  },
  relatedPrompts: [],
  setRelatedPrompts: (prompts) => set({ relatedPrompts: prompts }),
  chatMiniOpen: false,
  setChatMiniOpen: (chatMiniOpen) => set({ chatMiniOpen }),
  chatMiniSlide: false,
  setChatMiniSlide: (chatMiniSlide) => set({ chatMiniSlide }),
}));

export default useChat;

import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import useChat from "@/lib/hooks/useChat";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { VideoDialog } from "../goldenChoice/video-dialog";

interface PopularPromptsProps {}

const prompts = [
  {
    title: "📰 Top news bangladesh",
    question: "Top news bangladesh",
  },
  {
    title: "⚽ Today top sports news",
    question: "Today top sports news",
  },
  {
    title: "💡 Give me a online business idea",
    question: "Give me a online business idea",
  },
  {
    title: "🏠 Remote Work Opportunities",
    question: "Remote Work Opportunities",
  },
  {
    title: "🧑🏻‍💻 Employment law in Bangladesh",
    question: "Employment law in Bangladesh",
  },
  {
    title: "✈️ Budget Travel Tips",
    question: "Budget Travel Tips",
  },
  {
    title: "🔐 Data protection and privacy laws",
    question:
      "Discuss the laws and regulations surrounding data protection and privacy in Bangladesh.",
  },
  {
    title: "💔 Divorce procedures in Bangladesh",
    question:
      "Explain the procedures for obtaining a divorce in Bangladesh, including custody and asset division.",
  },
  {
    title: "🌍 Immigration and visa processes",
    question:
      "Provide insights into the immigration and visa processes for foreigners seeking to work or reside in Bangladesh.",
  },
  {
    title: "🏠 Real estate laws in Bangladesh",
    question:
      "Discuss the legal framework for real estate transactions in Bangladesh, including property purchase and leasing.",
  },
];

const finances = [
  {
    title: "📰 Bangladesh stock market news",
    question: `Bangladesh stock market news`,
  },
  {
    title: "📱 Should I Invest in GP BD",
    question: `Should I Invest in Grameenphone BD`,
  },
  {
    title: "👚 Should I Invest in FEKDIL BD",
    question: `Should I Invest in FEKDIL BD`,
  },
  {
    title: "▶️ Duty AI ব্যাবহার ভিডিও 06 oct 2024",
    question: `Duty AI ব্যাবহার ভিডিও 06 oct 2024`,
  },
  // {
  //   title: "⚖️ Golden choice",
  //   question: `Golden choice`,
  // },
];

const forex = [
  {
    title: "EUR/USD",
    question: "EUR/USD",
  },
  {
    title: "GBP/USD",
    question: "GBP/USD",
  },
  {
    title: "USD/JPY",
    question: "USD/JPY",
  },
  {
    title: "AUD/USD",
    question: "AUD/USD",
  },
  {
    title: "EUR/GBP",
    question: "EUR/GBP",
  },
];

const PopularPrompts: FunctionComponent<PopularPromptsProps> = () => {
  const chatStore = useChat();
  const { setPrompt, setSubmitPrompt, template, setOpenGolden } = chatStore;
  const { user } = useUser();
  const [videoModal, setVideoModal] = useState(false);

  const topPrompts =
    template == "general"
      ? prompts
      : template == "finance"
      ? finances
      : template == "forex"
      ? forex
      : [];

  const onPromptClick = (query: string) => {
    if (query === "Duty AI ব্যাবহার ভিডিও 06 oct 2024") {
      setVideoModal(true);
    } else if (query === "Golden choice") {
      setOpenGolden(true);
    } else {
      setPrompt(query);
      setSubmitPrompt(true);
    }
  };

  return (
    <div className="px-4 pb-8">
      <h1 className="text-xl sm:text-3xl font-semibold">
        Hello, {user?.firstName + " " + user?.lastName}
      </h1>
      <p className="text-muted-foreground sm:mt-2">
        {template === "finance"
          ? "Let's chat about stocks!"
          : "How can I help you today?"}
      </p>
      <div
        className={cn(
          "mt-8 grid gap-4 bg-card-foreground shadow p-6 rounded-xl",
          template == "general" && "sm:grid-cols-2"
        )}>
        {topPrompts.map((prompt, i) => {
          return (
            <Button
              onClick={() => onPromptClick(prompt.question)}
              size="lg"
              key={i}
              className="rounded-md bg-card hover:bg-card"
              variant="outline">
              <span className="line-clamp-1">{prompt.title}</span>
            </Button>
          );
        })}
      </div>
      <VideoDialog open={videoModal} setOpen={setVideoModal} />
    </div>
  );
};

export default PopularPrompts;

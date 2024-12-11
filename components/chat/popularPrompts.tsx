import useChat from "@/lib/hooks/useChat";
import useStockData from "@/lib/hooks/useStockData";
import useVipSignal from "@/lib/hooks/useVipSignal";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { VideoDialog } from "../goldenChoice/video-dialog";
import Image from "next/image";

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
    question: `Should I Invest in GP BD`,
  },
  {
    title: "📊 আজকের ইনডেক্স সম্পর্কে বল",
    question: `আজকের ইনডেক্স সম্পর্কে বল`,
  },
  {
    title: "▶️ Duty AI ব্যাবহার ভিডিও",
    question: `Duty AI ব্যাবহার ভিডিও`,
  },
  {
    title: "🔍 Stock Scanner",
    question: "Stock Scanner",
  },
  {
    title: "⚖️ Golden choice",
    question: `Golden choice`,
  },
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

const scanner = [
  {
    title: "📅 আগামীকাল কোন সেক্টর ভালো পারফর্ম করবে?",
    question: "আগামীকাল কোন সেক্টর ভালো পারফর্ম করবে?",
  },
  {
    title: "💰 কোন শেয়ারগুলো সর্বোচ্চ ডিভিডেন্ড দেয়?",
    question: "কোন শেয়ারগুলো সর্বোচ্চ ডিভিডেন্ড দেয়?",
  },
  {
    title: "💸 কম দামে ভালো পটেনশিয়াল স্টক খুঁজে দাও।",
    question: "কম দামে ভালো পটেনশিয়াল স্টক খুঁজে দাও।",
  },
  {
    title: "📊 এখন কোন শেয়ার কেনা উচিত?",
    question: "এখন কোন শেয়ার কেনা উচিত?",
  },
  {
    title: "🔥 আজকের শীর্ষ পারফর্মিং শেয়ারগুলো কী?",
    question: "আজকের শীর্ষ পারফর্মিং শেয়ারগুলো কী?",
  },
  {
    title: "⏳ কিছু শর্ট টার্ম স্টক খুঁজে দাও।",
    question: "কিছু শর্ট টার্ম স্টক খুঁজে দাও।",
  },
];

const PopularPrompts: FunctionComponent<PopularPromptsProps> = () => {
  const chatStore = useChat();
  const { marketData } = useStockData();
  const {
    setPrompt,
    setSubmitPrompt,
    template,
    setTemplate,
    setOpenGolden,
    setVideoModal,
  } = chatStore;
  const { user } = useUser();
  const [videoOpen, setVideoOpen] = useState(false);

  const topPrompts =
    template === "general"
      ? prompts
      : template === "finance"
      ? finances
      : template === "forex"
      ? forex
      : template === "scanner"
      ? scanner
      : [];

  const onPromptClick = (query: string) => {
    if (query === "Duty AI ব্যাবহার ভিডিও") {
      setVideoOpen(true);
    } else if (query === "Golden choice") {
      if (marketData.length > 0) {
        setOpenGolden(true);
      } else {
        toast({
          title: "Data not available",
          description: "Please try again later",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else if (query === "Stock Scanner") {
      setTemplate("scanner");
    } else {
      setPrompt(query);
      setSubmitPrompt(true);
    }
  };

  return (
    <div className="px-4 pb-8">
      <h1
        className={cn(
          "text-xl sm:text-3xl font-semibold",
          template === "scanner" && "text-[#6EA8D5]"
        )}>
        Hello, {user?.firstName + " " + user?.lastName}
      </h1>
      <p className="text-muted-foreground sm:mt-2">
        {template === "finance"
          ? "Let's chat about stocks!"
          : template === "scanner"
          ? "🎯 Let’s find the best stocks!"
          : "How can I help you today?"}
      </p>
      <div
        className={cn(
          "mt-8 grid gap-4 bg-card-foreground shadow p-6 rounded-xl",
          template == "general" && "sm:grid-cols-2",
          template === "scanner" &&
            "p-0 shadow-none rounded-none bg-transparent"
        )}>
        {topPrompts.map((prompt, i) => {
          return (
            <Button
              onClick={() => onPromptClick(prompt.question)}
              size="lg"
              key={i}
              className={cn(
                "rounded-md bg-card hover:bg-card relative",
                template === "scanner" &&
                  "border-[1.5px] border-[#8AB4C9] dark:border-[#3A7CA5] bg-[#E8ECEF] hover:bg-[#E8ECEF] dark:bg-[#2D2F34] hover:dark:bg-[#2D2F34] text-left justify-start px-3",
                prompt.question === "Stock Scanner" &&
                  "bg-gradient-to-r from-[#91C6F0] dark:from-[#121212] to-[#F0F2F5] dark:to-[#000000] text-[#8B7500] dark:text-[#FFD700] hover:text-[#8B7500] hover:dark:text-[#FFD700]",
                prompt.question === "Golden choice" &&
                  "bg-[#FFD700] hover:bg-[#FFD700] text-[#8B7500] dark:bg-gradient-to-b from-[#121212] to-[#000000] dark:text-[#FFD700] hover:text-[#8B7500] hover:dark:text-[#FFD700]"
              )}
              variant="outline">
              <span className="line-clamp-1">{prompt.title}</span>
              {prompt.question === "Stock Scanner" && (
                <Image
                  src={"/magicActive.svg"}
                  width={18}
                  height={18}
                  alt="icon"
                  className="absolute right-2"
                />
              )}
            </Button>
          );
        })}
      </div>
      <VideoDialog
        open={videoOpen}
        setOpen={setVideoOpen}
        url={"https://www.youtube.com/embed/c6fZbt9zaOM?autoplay=1"}
      />
    </div>
  );
};

export default PopularPrompts;

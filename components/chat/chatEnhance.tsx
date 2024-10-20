import {
  DollarSign,
  Info,
  Languages,
  MoveHorizontal,
  Scissors,
  TextQuote,
  Wand2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useChat from "@/lib/hooks/useChat";
import { ChatMessageProps } from "./chatMessage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface CEProps {
  message: ChatMessageProps;
}

const ChatEnhance = ({ message }: CEProps) => {
  const chatStore = useChat();
  const { setPrompt, setSubmitPrompt } = chatStore;

  const onPromptClick = (query: string) => {
    setPrompt(query);
    setSubmitPrompt(true);
  };

  const options = [
    {
      title: "Translate",
      icon: <Languages className="w-4 h-4" />,
      prompt: null,
      menu: [
        {
          title: "English",
          prompt: "Translate previous message to English",
          icon: "🇺🇸",
        },
        {
          title: "Chinese",
          prompt: "Translate previous message to Chinese",
          icon: "🇨🇳",
        },
        {
          title: "Malay",
          prompt: "Translate previous message to Malay",
          icon: "🇲🇾",
        },
        {
          title: "Tamil",
          prompt: "Translate previous message to Tamil",
          icon: "🇰🇷",
        },
      ],
    },
    {
      title: "Improve",
      prompt: "Improve previous message",
      icon: <Wand2 className="w-4 h-4" />,
    },
    {
      title: "Explain",
      prompt: "Explain previous message",
      icon: <Info className="w-4 h-4" />,
    },
    {
      title: "Make longer",
      prompt: "Make previous message longer",
      icon: <MoveHorizontal className="w-4 h-4" />,
    },
    {
      title: "Make shorter",
      prompt: "Make previous message shorter",
      icon: <Scissors className="w-4 h-4" />,
    },
    {
      title: "Summarize",
      prompt: "Summarize previous message",
      icon: <TextQuote className="w-4 h-4" />,
    },
    // {
    //   title: "Breakdown",
    //   prompt: "",
    //   icon: <DollarSign className="w-4 h-4" />,
    // },
  ];
  return (
    <div className="flex gap-2 flex-nowrap snap-x overflow-x-scroll w-full pb-2">
      {options.map((option, index) => {
        if (option.title == "Breakdown") {
          return (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  className="gap-2 flex-shrink-0 snap-start rounded-full bg-yellow-100 hover:bg-yellow-700 hover:text-yellow-50 text-yellow-900 text-xs py-1.5 h-auto font-normal">
                  {option.icon}
                  {option.title}
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-96">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Breakdown</h4>
                    <p className="text-sm text-muted-foreground">
                      Usage and cost breakdown for the prompt
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Total Words</Label>
                      <p className="col-span-2 border px-2 py-1 rounded">
                        {message.answer?.split(" ")?.length || "0"}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Prompt Tokens</Label>
                      <p className="col-span-2 border px-2 py-1 rounded">
                        {message.promptTokens || "0"}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Answer Tokens</Label>
                      <p className="col-span-2 border px-2 py-1 rounded">
                        {message.completionTokens || "0"}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Total Tokens</Label>
                      <p className="col-span-2 border px-2 py-1 rounded">
                        {message.totalTokens || "0"}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Total Cost</Label>
                      <p className="col-span-2 border px-2 py-1 rounded">
                        {`$${message.totalCost || "0.0"}`}
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        }
        if (option.menu) {
          return (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger>
                <Button
                  size="sm"
                  className="gap-2 flex-shrink-0 snap-start rounded-full bg-pink-100 hover:bg-pink-700 hover:text-pink-50 text-pink-900 text-xs py-1.5 h-auto font-normal">
                  {option.icon}
                  {option.title}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {option.menu.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() =>
                      onPromptClick(item.prompt)
                    }>{`${item.icon} ${item.title}`}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        return (
          <Button
            key={index}
            onClick={() => onPromptClick(option.prompt)}
            size="sm"
            className="gap-2 flex-shrink-0 snap-start rounded-full bg-[#333] hover:bg-[#333] text-white text-xs py-1.5 h-auto font-normal">
            {option.icon}
            {option.title}
          </Button>
        );
      })}
    </div>
  );
};

export default ChatEnhance;

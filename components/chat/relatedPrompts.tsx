import { Button } from "../ui/button";
import useChat from "@/lib/hooks/useChat";
import { ChatMessageProps } from "./chatMessage";

interface CEProps {
  message: ChatMessageProps;
}
const financeRelated = [
  "Balance sheet analysis",
  "Income statement analysis",
  "Dividend analysis",
  "Cashflow analysis",
  "Earning analysis",
];
const RelatedPrompts = ({ message }: CEProps) => {
  const chatStore = useChat();
  const { setPrompt, setSubmitPrompt, relatedPrompts, isSubmiting, template } =
    chatStore;

  const onPromptClick = (query: string) => {
    setPrompt(query);
    setSubmitPrompt(true);
  };

  return (
    <>
      {template == "finance" &&
      (message.text?.toLowerCase()?.includes("financial summary") ||
        message.text?.toLowerCase()?.includes("current stock price") ||
        message.text?.toLowerCase()?.includes("balance") ||
        message.text?.toLowerCase()?.includes("income") ||
        message.text?.toLowerCase()?.includes("dividend") ||
        message.text?.toLowerCase()?.includes("cash flow") ||
        message.text?.toLowerCase()?.includes("earning")) ? (
        <>
          {!isSubmiting && (
            <div className="pb-4 sm:px-4">
              <div className="flex flex-wrap gap-2">
                {financeRelated.map((p: any, i) => (
                  <Button
                    key={i}
                    onClick={() => onPromptClick(p)}
                    size="lg"
                    variant="outline"
                    className="rounded-full gap-2 border-primary"
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {relatedPrompts.length > 0 && !isSubmiting && (
            <div className="pb-4 sm:px-4">
              <div className="flex flex-wrap gap-2">
                {relatedPrompts.map((p: any, i) => (
                  <Button
                    key={i}
                    onClick={() => onPromptClick(p.prompt || p.question)}
                    size="lg"
                    variant="outline"
                    className="rounded-full gap-2 border-primary"
                  >
                    {p.prompt || p.question}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RelatedPrompts;

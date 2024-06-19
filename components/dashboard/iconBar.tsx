"use client";
import { iconbarItems } from "@/components/global/navData";
import LogoIcon from "@/components/icons/LogoIcon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useChat from "@/lib/hooks/useChat";
import useDashboard from "@/lib/hooks/useDashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const IconBar = ({ isMobile = false }) => {
  const pathname = usePathname();
  const dashboardStore = useDashboard();
  const { showMobileSidebar } = dashboardStore;
  const { setActiveConversationId, setMessages, setPrompt } = useChat();

  return (
    <div
      className={cn(
        "h-screen  z-50 px-2 py-4 flex-col items-center justify-between gap-8 w-16 bg-slate-200 flex-shrink-0 sticky top-0",
        isMobile ? "flex" : "hidden sm:flex"
      )}
    >
      <div className="px-2 flex-1 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-center">
          <Link href={"/"}>
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {iconbarItems.map((item) => (
            <TooltipProvider key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.link}>
                    <Button
                      onClick={() => {
                        setActiveConversationId(null);
                        setMessages([]);
                        setPrompt("");
                      }}
                      className={cn(
                        "p-3",
                        pathname === item?.link &&
                          "bg-background/80 text-background hover:bg-background/80 hover:text-background"
                      )}
                      variant="ghost"
                    >
                      <item.icon className="text-brand w-6 h-6" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="lg:block hidden" side="right">
                  <p className="capitalize">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="h-8 w-8"></div>
      </div>
    </div>
  );
};

export default IconBar;

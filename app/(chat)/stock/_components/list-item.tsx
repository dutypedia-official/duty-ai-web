import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api";
import useChat from "@/lib/hooks/useChat";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import useUi from "@/lib/hooks/useUi";
import { cn, useColorScheme } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCaretDown, FaCaretUp, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineEditNotifications, MdOutlineShowChart } from "react-icons/md";
import { PiMagicWandFill } from "react-icons/pi";
import { SetAlarm } from "./set-alarm";
import { BellPlus } from "lucide-react";

export const ListItem = ({
  name,
  price,
  value,
  change,
  logoUrl,
  volume,
  alerms,
  aiAlarms,
  changePer,
  favs,
  onFavList,
  trading,
  inputText,
  setInputText,
  activeTab,
  setActiveTab,
  handelSetAiAlerm,
  error,
  setError,
  currentAlarm,
  currentAiAlerm,
  setCompanyName,
  targetPrice,
}: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isPositive = !change?.startsWith("-");
  const isPositivePer = !changePer?.startsWith("-");

  const router = useRouter();
  const {
    activeF,
    setRefreashFav,
    refreashFav,
    mainServerAvailable,
    setSelectedAlarmShit,
    setSelectedStock,
    setAlarmSheet,
  } = useUi();
  const { setIsAskingAi, setChatMiniOpen, setChatMiniSlide } = useChat();
  const {
    setTemplate,
    setActiveConversationId,
    setPrompt,
    setSubmitPrompt,
    setPromptCompanyName,
    isSubmiting,
    setIsSubmiting,
    setMessages,
  } = useChat();
  const { getToken } = useAuth();
  const client = apiClient();

  const isFav = favs?.find((fav: any) => fav.symbol == name);

  const [isFavorite, setIsFavorite] = useState(
    onFavList ? true : isFav ? true : activeF == "favorite" ? true : false
  );

  const toggleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      const token = await getToken();

      const response = await client.post(
        "/tools/fav-symbol",
        {
          symbol: name,
          price,
          currency: "BDT",
          trading: "10.12",
          change,
          logo: logoUrl,
          volume,
        },
        token,
        mainServerAvailable
      );
      setRefreashFav(!refreashFav);
      console.log(response.data);
    } catch (error) {
    } finally {
    }

    // Optionally, you can add logic to update the favorite status in your backend or state management
  };

  const askAiFn = () => {
    setTemplate("finance");
    setActiveConversationId(null);
    setPromptCompanyName(name);
    setPrompt(`DSEBD:${name} bangladesh`);
    setSubmitPrompt(true);
    setChatMiniOpen(true);
    setChatMiniSlide(true);
    setActiveTab("aiChat");
  };

  // useEffect(() => {
  //   setPrompt("");
  //   setActiveConversationId(null);
  //   setIsAskingAi(false);
  //   setChatMiniOpen(false);
  // }, []);

  const Fav = () => {
    return (
      <button onClick={toggleFavorite} className="flex items-center">
        {isFavorite || activeF == "favorite" ? (
          <FaHeart className="text-[#CE1300] w-5 h-5" />
        ) : (
          <FaRegHeart className="text-[#CE1300] w-5 h-5" />
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col xl:flex-row xl:justify-between gap-3 rounded-xl lg:rounded-none p-3 lg:py-3 bg-card-foreground lg:bg-transparent lg:dark:bg-transparent">
      <div className="flex flex-col xl:flex-row xl:items-center gap-3 w-full">
        <div className="flex items-start justify-between lg:justify-normal">
          <div className="flex items-center lg:w-40">
            <Avatar className="w-6 lg:w-8 h-6 lg:h-8 mr-2">
              <AvatarImage src={logoUrl} />
              <AvatarFallback className="border-none outline-none bg-[#F0F3FA] text-black font-semibold">
                {name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-[#00B0FF] uppercase lg:text-sm font-bold">
                {name}
              </h3>
              <h4 className="text-[#34495E] dark:text-white text-sm lg:font-bold hidden lg:block">
                ৳ {price}
              </h4>
            </div>
          </div>
          <div className="flex lg:hidden">
            <Fav />
          </div>
        </div>
        <div className="flex lg:hidden justify-between ">
          <h4 className="text-[#34495E] dark:text-white text-sm lg:font-bold">
            ৳ {price}
          </h4>
          <div className="">
            <div className="flex items-center">
              {!isPositive ? (
                <FaCaretDown className="w-4 h-4 text-[#FF000F]" />
              ) : (
                <FaCaretUp className="w-4 h-4 text-[#2ECC71]" />
              )}
              <p
                className={cn(
                  "text-[#2ECC71] text-sm",
                  !isPositive && "text-[#FF000F]"
                )}>
                {change}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around gap-3 w-full">
          <div className="text-center lg:text-left hidden lg:block lg:w-14">
            <h4 className="text-[#CAD3D8] dark:text-white text-xs">%</h4>
            <div className="flex items-center">
              {!isPositive ? (
                <FaCaretDown className="w-4 h-4 text-[#FF000F]" />
              ) : (
                <FaCaretUp className="w-4 h-4 text-[#2ECC71]" />
              )}
              <p
                className={cn(
                  "text-[#2ECC71] text-sm",
                  !isPositive && "text-[#FF000F]"
                )}>
                {changePer}
              </p>
            </div>
          </div>
          <div className="text-center lg:text-left hidden lg:block lg:w-14">
            <h4 className="text-[#CAD3D8] dark:text-white text-xs">Change</h4>
            <div className="flex items-center">
              {!isPositive ? (
                <FaCaretDown className="w-4 h-4 text-[#FF000F]" />
              ) : (
                <FaCaretUp className="w-4 h-4 text-[#2ECC71]" />
              )}
              <p
                className={cn(
                  "text-[#2ECC71] text-sm",
                  !isPositive && "text-[#FF000F]"
                )}>
                {change}
              </p>
            </div>
          </div>
          <div className="lg:w-16">
            <h4 className="text-[#CAD3D8] dark:text-white text-xs">Value</h4>
            <p className="text-[#4B758A] dark:text-[#B0BEC5] text-xs lg:text-sm">
              {value}
            </p>
          </div>
          <div className="w-[1px] h-4 bg-border lg:hidden lg:w-10"></div>
          <div className="lg:w-20">
            <h4 className="text-[#CAD3D8] dark:text-white text-xs">Volume</h4>
            <p className="text-[#4B758A] dark:text-[#B0BEC5] text-xs lg:text-sm">
              {volume}
            </p>
          </div>
          <div className="w-[1px] h-4 bg-border lg:hidden lg:w-10"></div>
          <div className="flex justify-between lg:justify-normal w-full lg:w-16">
            <div className="text-center lg:text-left">
              <h4 className="text-[#CAD3D8] dark:text-white text-xs">Trade</h4>
              <p className="text-[#4B758A] dark:text-[#B0BEC5] text-xs lg:text-sm">
                {trading}
              </p>
            </div>
            <Button className="lg:hidden hover:bg-[#2ECC71] bg-[#2ECC71]   border border-[#2ECC71] dark:border-[#333333] text-white font-normal min-w-max text-[10px] sm:text-sm h-0 w-0 px-2 py-4">
              <MdOutlineShowChart className="w-4 h-4 text-white mr-0.5" />
              {changePer}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between lg:justify-normal items-center gap-3">
        <a
          href={`https://www.tradingview.com/chart/?symbol=DSEBD:${name}&utm_source=www.tradingview.com&utm_medium=widget&utm_campaign=chart&utm_term=DSEBD:${name}&theme=${colorScheme}`}
          target="_blank"
          rel="noopener noreferrer">
          <Button className="hover:bg-[#EAEDED] bg-[#EAEDED] hover:dark:bg-[#333333] dark:bg-[#333333] border border-[#EAEDED] dark:border-[#333333] text-[#757575] dark:text-white font-normal min-w-max text-[10px] sm:text-sm h-0 w-0 p-4">
            <MdOutlineShowChart className="w-4 h-4 text-[#5188D4] dark:text-white mr-0.5" />
            Chart
          </Button>
        </a>

        <Button
          onClick={() => {
            setAlarmSheet(true);
            setSelectedAlarmShit(currentAlarm);
            setSelectedStock({
              name,
              price,
              value,
              change,
              logoUrl,
              volume,
              changePer,
            });
            setCompanyName(name);
          }}
          className="hover:bg-[#EAEDED] bg-[#EAEDED] hover:dark:bg-[#333333] dark:bg-[#333333] border border-[#EAEDED] dark:border-[#333333] text-[#757575] dark:text-white font-normal min-w-max text-[10px] sm:text-sm h-0 w-0 p-4">
          {currentAlarm || currentAiAlerm ? (
            <MdOutlineEditNotifications className="w-4 h-4 text-red-500 mr-0.5" />
          ) : (
            <BellPlus className="w-4 h-4 text-[#5188D4] mr-0.5" />
          )}

          {currentAlarm || currentAiAlerm ? "Edit Alarm" : "Set Alarm"}
        </Button>

        <Button
          onClick={askAiFn}
          disabled={isSubmiting}
          className="disabled:bg-gray-100 hover:bg-[#EAEDED] bg-[#EAEDED] hover:dark:bg-[#333333] dark:bg-[#333333] border border-[#EAEDED] dark:border-[#333333] text-[#757575] dark:text-white font-normal min-w-max text-[10px] sm:text-sm h-0 w-0 p-4">
          <PiMagicWandFill className="w-4 h-4 text-[#5188D4]mr-0.5" />
          Ask AI
        </Button>

        <div className="hidden lg:block">
          <Fav />
        </div>
      </div>
    </div>
  );
};

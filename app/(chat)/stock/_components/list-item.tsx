import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api";
import useChat from "@/lib/hooks/useChat";
import useUi from "@/lib/hooks/useUi";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
import { toast } from "@/components/ui/use-toast";
import { BellPlus } from "lucide-react";
import { PiMagicWandFill } from "react-icons/pi";
import { cn, useColorScheme } from "@/lib/utils";
import { SetAlarm } from "./set-alarm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

export const ListItem = ({
  name,
  price,
  value,
  change,
  logoUrl,
  volume,
  alerms,
  changePer,
  favs,
  onFavList,
  trading,
}: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isPositive = !change?.startsWith("-");
  const isPositivePer = !changePer?.startsWith("-");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const {
    setRefreashFav,
    refreashFav,
    refreash,
    setRefreash,
    mainServerAvailable,
    setAskAiShow,
  } = useUi();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { setIsAskingAi, isAskingAi } = useChat();
  const {
    setTemplate,
    setActiveConversationId,
    setPrompt,
    setSubmitPrompt,
    setPromptCompanyName,
  } = useChat();
  const { getToken } = useAuth();
  const client = apiClient();
  const currentAlerm = alerms?.find((alerm: any) => alerm.symbol === name);
  const isFav = favs?.find((fav: any) => fav.symbol === name);
  const [targetPrice, setTargetPrice] = useState(
    currentAlerm ? `${currentAlerm.price}` : ""
  );
  const [isFavorite, setIsFavorite] = useState(
    onFavList ? true : isFav ? true : false
  );
  const isLargerScreen = useMediaQuery("(min-width: 1536px)");

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

  const handelSetAlerm = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (+price?.replace(",", "") === parseFloat(targetPrice)) {
        return toast({
          title: "Price is same as current price!",
        });
      }
      await client.post(
        "/noti/create-alerm",
        {
          price: parseFloat(targetPrice),
          symbol: name,
          condition:
            parseFloat(targetPrice) > +price?.replace(",", "") ? "Up" : "Down",
        },
        token,
        mainServerAvailable
      );

      toast({
        title: "Alarm set successfully",
      });
      if (onFavList) {
        setRefreashFav(!refreashFav);
      } else {
        setRefreash(!refreash);
      }
      hideModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handelDeleteAlerm = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      await client.delete(
        `/noti/delete-alerm/${currentAlerm.id}`,
        token,
        {}
        // mainServerAvailable
      );
      toast({
        title: "Alarm deleted successfully",
      });
      setRefreash(!refreash);
      setRefreashFav(!refreashFav);
      hideModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const askAiFn = () => {
    try {
      if (isLargerScreen) {
        setAskAiShow(true);
        setTemplate("finance");
        setActiveConversationId(null);
        setPromptCompanyName(name);
        setPrompt(`DSEBD:${name} bangladesh`);
        setSubmitPrompt(true);
      } else {
        setTemplate("finance");
        setActiveConversationId(null);
        setPrompt(`DSEBD:${name} bangladesh`);
        setSubmitPrompt(true);
        router.push("/finance");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAskAiShow(false);
    setPrompt("");
    setActiveConversationId(null);
    setIsAskingAi(false);
  }, []);

  const Fav = () => {
    return (
      <button onClick={toggleFavorite} className="flex items-center">
        {isFavorite ? (
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

        <SetAlarm
          targetPrice={targetPrice}
          setTargetPrice={setTargetPrice}
          currentAlerm={currentAlerm}
          loading={loading}
          handelSetAlerm={handelSetAlerm}
          handelDeleteAlerm={handelDeleteAlerm}
        />

        <Button
          onClick={askAiFn}
          disabled={isAskingAi}
          className="disabled:bg-gray-100 hover:bg-[#EAEDED] bg-[#EAEDED] hover:dark:bg-[#333333] dark:bg-[#333333] border border-[#EAEDED] dark:border-[#333333] text-[#757575] dark:text-white font-normal min-w-max text-[10px] sm:text-sm h-0 w-0 p-4">
          <PiMagicWandFill className="w-4 h-4 text-[#5188D4] dark:text-white mr-0.5" />
          Ask AI
        </Button>

        <div className="hidden lg:block">
          <Fav />
        </div>
      </div>
    </div>
  );
};

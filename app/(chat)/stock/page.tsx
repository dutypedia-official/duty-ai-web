"use client";
import MobileSidebar from "@/components/chat/mobileSidebar";
import ProfileMenu from "@/components/global/profileMenu";
import useNav from "@/lib/hooks/useNav";
import { cn } from "@/lib/utils";
import { Menu, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { Filters } from "./_components/filters";
import MarketOverview from "./_components/market-overview";
import { Overview } from "./_components/overview";
import { StockList } from "./_components/stock-list";
import { TopNoti } from "./_components/top-noti";
import useUi from "@/lib/hooks/useUi";
import { apiClient } from "@/lib/api";
import useStockData from "@/lib/hooks/useStockData";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import { SetAlarm } from "./_components/set-alarm";
import { Button } from "@/components/ui/button";
import { PiMagicWandFill } from "react-icons/pi";
import ChatMain from "@/components/chat/chatMain";
import { ModeToggle } from "@/components/modeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import useChat from "@/lib/hooks/useChat";

export default function page() {
  const { closeNav, openNav, isShowNav } = useNav();

  const {
    refreash,
    setRefreash,
    screenRefresh,
    setScreenRefresh,
    mainServerAvailable,
    askAiShow,
    refreashFav,
  } = useUi();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading2, setIsLoading2] = useState(true);

  const {
    marketData,
    setMarketData,
    favorites,
    setFavorites,
    setIsLoading,
    isLoading,
  } = useStockData();

  const [activeFilter, setActiveFilter] = useState("");
  const [alerms, setAlerms] = useState([]);
  const { getToken } = useAuth();
  const client = apiClient();
  const router = useRouter();
  const initialStocks = !activeFilter
    ? marketData
    : marketData.filter((stock: any) => stock[activeFilter] == true) || [];
  const chatStore = useChat();
  const { setTemplate } = chatStore;
  const fetchStockData = async () => {
    try {
      const { data: mData } = await client.get(
        "/tools/get-stock-market",
        null,
        {}
        // mainServerAvailable
      );
      setMarketData(mData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(!isLoading);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchFavs = async () => {
    try {
      const token = await getToken();
      const { data } = await client.get(
        "/tools/get-favs",
        token,
        {}
        // mainServerAvailable
      );
      setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken();
      const { data } = await client.get("/tools/get-favs", token);
      const { data: alermData } = await client.get("/noti/get-alerms", token);
      setAlerms(alermData);
      setFavorites(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreashFav]);

  // Filter stocks based on the search term
  const filteredStocks =
    activeFilter === "favorite"
      ? favorites?.filter((stock: any) =>
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : initialStocks?.filter((stock: any) =>
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

  useEffect(() => {
    setTemplate("finance");
    return () => {
      setTemplate("general");
    };
  }, []);

  return (
    <div className="w-full bg-[#F0F2F5] dark:bg-[#0F0F0F]">
      <div className="sticky top-0 h-16 z-20 px-4 bg-card-foreground backdrop-blur-md w-full lg:shadow-sm flex items-center">
        <div className="w-full flex items-center justify-between">
          <MobileSidebar />
          <div className="">
            <Menu
              className={cn("w-7 h-7 cursor-pointer", "hidden lg:flex")}
              onClick={isShowNav ? closeNav : openNav}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* <TopNoti /> */}
            <ModeToggle />
            <ProfileMenu />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 sm:p-5 w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <div className="w-full">
            <div className="lg:bg-card-foreground px-2 py-5 lg:p-5 rounded-lg flex flex-col gap-8">
              <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              <div className="w-full max-h-[calc(100vh-13.5rem)] overflow-auto">
                {isLoading || isLoading2 ? (
                  Array.from(Array(20).keys()).map((i) => (
                    <div key={i} className="my-5 flex gap-5">
                      <Skeleton className="h-10 flex-1 bg-card" />
                      <Skeleton className="h-10 w-24 bg-card" />
                      <Skeleton className="h-10 w-24 bg-card" />
                      <Skeleton className="h-10 w-24 bg-card" />
                      <Skeleton className="h-10 w-24 bg-card" />
                      <Skeleton className="h-10 w-40 bg-card" />
                    </div>
                  ))
                ) : activeFilter === "favorite" ? (
                  <StockList
                    filteredStocks={filteredStocks}
                    favorites={favorites}
                    alerms={alerms}
                    onFavList={true}
                  />
                ) : (
                  <StockList
                    filteredStocks={filteredStocks}
                    favorites={favorites}
                    alerms={alerms}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={cn(askAiShow ? "hidden 2xl:block" : "hidden")}>
            <ChatMain mini={true} />
          </div>
          <div className="hidden 2xl:block">
            {!askAiShow && <MarketOverview />}
          </div>
        </div>
      </div>

      <div className="fixed 2xl:hidden bottom-40 right-0">
        <Overview />
      </div>
    </div>
  );
}

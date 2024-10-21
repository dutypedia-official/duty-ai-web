"use client";
import ChatMain from "@/components/chat/chatMain";
import MobileSidebar from "@/components/chat/mobileSidebar";
import ProfileMenu from "@/components/global/profileMenu";
import { ModeToggle } from "@/components/modeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import useChat from "@/lib/hooks/useChat";
import useStockData from "@/lib/hooks/useStockData";
import useUi from "@/lib/hooks/useUi";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Filters } from "./_components/filters";
import MarketOverview from "./_components/market-overview";
import { Overview } from "./_components/overview";
import { StockList } from "./_components/stock-list";
import { cn } from "@/lib/utils";
import { StockChatMini } from "./_components/stock-chat-mini";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

export default function page() {
  const { askAiShow, refreash, mainServerAvailable } = useUi();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading2, setIsLoading2] = useState(true);

  const { marketData, favorites, setFavorites, isLoading } = useStockData();

  const [activeFilter, setActiveFilter] = useState("");
  const [alerms, setAlerms] = useState([]);
  const { getToken } = useAuth();
  const client = apiClient();

  const chatStore = useChat();
  const { setTemplate, chatMiniOpen, setChatMiniOpen } = chatStore;

  const fetchAlerms = async () => {
    try {
      const token = await getToken();
      const { data } = await client.get(
        "/noti/get-alerms",
        token,
        {},
        //@ts-ignore
        mainServerAvailable
      );
      setAlerms(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };

  const fetchFavs = async () => {
    try {
      const token = await getToken();
      const { data } = await client.get(
        "/tools/get-favs",
        token,
        {},
        //@ts-ignore
        mainServerAvailable
      );
      setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAlerms();
  }, [refreash]);

  useEffect(() => {
    fetchFavs();
  }, []);

  const initialStocks = !activeFilter
    ? marketData
    : marketData.filter((stock: any) => stock[activeFilter] == true) || [];

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

  const isLargerScreen = useMediaQuery("(min-width: 1536px)");

  return (
    <div className="w-full bg-[#F0F2F5] dark:bg-[#0F0F0F]">
      <div className="sticky top-0 h-16 z-20 px-4 bg-[#fff] dark:bg-card-foreground backdrop-blur-md w-full lg:shadow-sm flex items-center">
        <div className="w-full flex items-center justify-between lg:justify-end">
          <MobileSidebar hide={true} />

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
              <div
                className={cn(
                  "w-full max-h-[calc(100vh-13.5rem)] overflow-auto ",
                  (isLoading || isLoading2) &&
                    "bg-card-foreground lg:bg-transparent rounded-md"
                )}>
                {isLoading || isLoading2 ? (
                  Array.from(Array(10).keys()).map((i) => (
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

      {!isLargerScreen && (
        <StockChatMini open={chatMiniOpen} setOpen={setChatMiniOpen} />
      )}
    </div>
  );
}

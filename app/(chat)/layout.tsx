"use client";
import IconBar from "@/components/dashboard/iconBar";
import { apiClient } from "@/lib/api";
import useChat from "@/lib/hooks/useChat";
import useStockData from "@/lib/hooks/useStockData";
import useUi from "@/lib/hooks/useUi";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const client = apiClient();
  const {
    setMarketData,
    setIsLoading,
    isLoading,
    currentPage,
    marketData,
    setHasMore,
  } = useStockData();
  const pathname = usePathname();
  const { setIsAskingAi, setIsSubmiting } = useChat();
  const { mainServerAvailable } = useUi();

  const fetchStockData = async () => {
    try {
      const { data: mData } = await client.get(
        `/tools/get-stock-market/${currentPage}`,
        null,
        {},
        //@ts-ignore
        mainServerAvailable
      );
      setMarketData(
        [...marketData, ...mData].filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        )
      );

      setHasMore(mData.length > 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [currentPage]);

  useEffect(() => {
    setIsAskingAi(false);
    setIsSubmiting(false);
  }, [pathname]);

  return (
    <div className="relative w-full">
      <div className="flex bg-background relative">
        <IconBar />
        {children}
      </div>
    </div>
  );
}

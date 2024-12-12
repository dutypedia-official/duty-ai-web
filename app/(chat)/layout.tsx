"use client";
import IconBar from "@/components/dashboard/iconBar";
import { GoldenChoice } from "@/components/goldenChoice/golden-choice";
import { apiClient } from "@/lib/api";
import useChat from "@/lib/hooks/useChat";
import useStockData from "@/lib/hooks/useStockData";
import useUi from "@/lib/hooks/useUi";
import { cn, useColorScheme } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { template } = useChat();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { isSignedIn } = useAuth();
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
      {isSignedIn ? (
        <div
          className={cn(
            "flex bg-background dark:bg-[#1E1E1E] relative",
            template === "scanner" && "bg-transparent"
          )}>
          {template === "scanner" && (
            <div className="fixed top-0 left-0 w-full h-full">
              <Image
                fill
                src={isDark ? "/scanner-pc-dark.svg" : "/scanner-pc-light.svg"}
                alt="scanner"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <IconBar />
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

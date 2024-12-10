"use client";

import useUi from "@/lib/hooks/useUi";
import { ListItem } from "./list-item";
import useStockData from "@/lib/hooks/useStockData";
import { Button } from "@/components/ui/button";
import { SetAlarm } from "./set-alarm";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiClient } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

export const getPrice = (item: any) => {
  //Check if the time is between 10 am to 2pm
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const time = hour + minute / 60;
  const isMarketOpen = time >= 10 && time <= 14;
  if (isMarketOpen) {
    if (item?.ltp && item?.ltp !== "0") {
      return item?.ltp;
    } else {
      return item?.close;
    }
  }

  if (item?.close && item?.close !== "0") {
    return item?.close;
  } else {
    return item?.ltp;
  }
};

export const StockList = ({
  filteredStocks,
  favorites,
  alerms,
  aiAlarms,
  onFavList = false,
  activeFilter,
  activeTab,
  setActiveTab,
  inputText,
  setInputText,
  error,
  setError,
}: any) => {
  const {
    activeF,
    setRefreashFav,
    refreashFav,
    refreash,
    setRefreash,
    mainServerAvailable,
    selectedStock,
    setSelectedAlarmShit,
    setSelectedStock,
    setAlarmSheet,
  } = useUi();
  const { getToken } = useAuth();
  const client = apiClient();
  const { hasMore, currentPage, setCurrentPage } = useStockData();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState(null);

  const currentAlarm: any = alerms?.find(
    (alerm: any) => alerm.symbol === companyName
  );
  const currentAiAlerm: any = aiAlarms?.find(
    (alerm: any) => alerm.symbol === companyName
  );

  const [targetPrice, setTargetPrice] = useState(
    currentAlarm ? `${currentAlarm?.price}` : ""
  );

  const handelSetAlerm = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (+selectedStock?.price?.replace(",", "") === parseFloat(targetPrice)) {
        return toast({
          title: "Price is same as current price!",
        });
      }
      await client.post(
        "/noti/create-alerm",
        {
          price: parseFloat(targetPrice),
          symbol: selectedStock.name,
          condition:
            parseFloat(targetPrice) > +selectedStock?.price?.replace(",", "")
              ? "Up"
              : "Down",
        },
        token,
        mainServerAvailable
      );
      setAlarmSheet(false);
      toast({
        title: "Alarm set successfully",
      });
      if (onFavList) {
        setRefreashFav(!refreashFav);
      } else {
        setRefreash(!refreash);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handelSetAiAlerm = async () => {
    if (!selectedStock) {
      toast({
        variant: "destructive",
        title: "Select a stock first!",
      });
    }
    try {
      setError(null);
      setLoading(true);
      const token = await getToken();
      console.log(selectedStock?.name);
      await client.post(
        "/noti/create-ai-alerm",
        {
          symbol: selectedStock?.name,
          prompt: inputText,
        },
        token,
        mainServerAvailable
      );

      toast({
        variant: "default",
        title: "Alarm set successfully",
      });
      setAlarmSheet(false);
      setRefreash(!refreash);
    } catch (error: any) {
      console.log(error.response?.data);
      setError(error.response?.data?.detail);
    } finally {
      setLoading(false);
    }
  };

  const handelDeleteAlerm = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      await client.delete(
        `/noti/delete-alerm/${currentAlarm.id}`,
        token,
        {},
        //@ts-ignore
        mainServerAvailable
      );
      toast({
        title: "Alarm deleted successfully",
      });
      setRefreash(!refreash);
      setRefreashFav(!refreashFav);
      setAlarmSheet(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handelDeleteAiAlerm = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      await client.delete(
        `/noti/delete-ai-alerm/${selectedStock.name}`,
        token,
        {},
        //@ts-ignore
        mainServerAvailable
      );
      toast({
        variant: "default",
        title: "Alarm deleted successfully",
      });
      setRefreash(!refreash);
      setRefreashFav(!refreashFav);
      // hideModal();
      setAlarmSheet(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error deleting alarm",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!filteredStocks?.length)
    return (
      <div className="flex items-center justify-center">
        <p>No stock data found</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-5 lg:gap-0 lg:divide-y max-h-[calc(100vh-13.5rem)] overflow-y-auto">
      {filteredStocks?.map((item: any, i: number) => {
        return (
          <ListItem
            key={i}
            changePer={item.changePer}
            name={item.symbol}
            price={getPrice(item)}
            change={item.change}
            logoUrl={`https://s3-api.bayah.app/cdn/symbol/logo/${item.symbol}.svg`}
            volume={item.volume}
            value={item.value}
            alerms={alerms}
            aiAlarms={aiAlarms}
            favs={favorites}
            trading={item.trade}
            onFavList={onFavList}
            inputText={inputText}
            setInputText={setInputText}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            error={error}
            setError={setError}
            handelSetAiAlerm={handelSetAiAlerm}
            setCompanyName={setCompanyName}
          />
        );
      })}

      {hasMore && (
        <div className="flex items-center justify-center">
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!hasMore}>
            Load More
          </Button>
        </div>
      )}
      <SetAlarm
        currentAlarm={currentAlarm}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        targetPrice={targetPrice}
        setTargetPrice={setTargetPrice}
        inputText={inputText}
        currentAiAlerm={currentAiAlerm}
        setInputText={setInputText}
        error={error}
        handelSetAlerm={handelSetAlerm}
        loading={loading}
        handelDeleteAlerm={handelDeleteAlerm}
        handelSetAiAlerm={handelSetAiAlerm}
        handelDeleteAiAlerm={handelDeleteAiAlerm}
      />
    </div>
  );
};

"use client";

import useUi from "@/lib/hooks/useUi";
import { ListItem } from "./list-item";

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
  onFavList = false,
  activeFilter,
}: any) => {
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
            favs={favorites}
            trading={item.trade}
            onFavList={onFavList}
          />
        );
      })}
    </div>
  );
};

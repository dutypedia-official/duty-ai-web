"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export const Filters = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}: {
  searchTerm: any;
  setSearchTerm: any;
  activeFilter: any;
  setActiveFilter: any;
}) => {
  const isBiggerScreen = useMediaQuery("(min-width: 1920px)");
  const isDesktop = useMediaQuery("(min-width: 425px)");

  const filterBtn = [
    { name: "❤️ Favorite", value: "favorite" },
    { name: "All", value: "" },
    {
      name: "Top gainers",
      value: "topGainer",
    },
    {
      name: "Biggest losers",
      value: "biggestLosers",
    },
    {
      name: "Most active",
      value: "mostActive",
    },
    {
      name: "Best performing",
      value: "bestPerforming",
    },
  ];
  return (
    <div className="flex justify-between gap-5 bg-card-foreground rounded-md p-5 lg:p-0">
      <div className="">
        <div className="w-full sm:w-64 relative">
          <Input
            placeholder="Search"
            className="rounded-3xl text-sm placeholder:text-sm w-full pl-5 pr-10 bg-card dark:bg-[#1F1F1F] dark:border-[#333333]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-4 h-4 dark:text-[#34495E]" />
        </div>
      </div>
      <div className={cn("block", isBiggerScreen && "hidden")}>
        <Select
          defaultValue=""
          onValueChange={(value) => setActiveFilter(value)}>
          <SelectTrigger
            className={cn("w-40 capitalize", !isDesktop && "w-10")}>
            {!isDesktop ? null : (
              <SelectValue placeholder={activeFilter} className="capitalize" />
            )}
          </SelectTrigger>
          <SelectContent className="bg-card">
            {filterBtn?.map((item, i) => {
              return (
                <SelectItem
                  key={i}
                  value={item.value}
                  className="capitalize hover:bg-card-foreground">
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className={cn("hidden gap-4 flex-wrap", isBiggerScreen && "flex")}>
        {filterBtn?.map((item, i) => {
          return (
            <Button
              key={i}
              onClick={() => setActiveFilter(item.value)}
              className={cn(
                "text-white border border-[#B0BEC5]",
                activeFilter != item.value && "bg-[#E0E0E0] dark:bg-[#1F1F1F]"
              )}>
              {item?.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

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
  const filterBtn = [
    { name: "❤️ Favorite", value: "favorite" },
    { name: "All", value: "" },
    { name: "Biggest losers", value: "biggestLosers" },
    { name: "Most active", value: "mostActive" },
  ];
  return (
    <div className="flex justify-between gap-5 bg-card-foreground rounded-md p-5 lg:p-0">
      <div className="">
        <div className="w-full sm:w-64 relative">
          <Input
            placeholder="Search"
            className="rounded-3xl text-sm placeholder:text-sm w-full pl-5 pr-10 bg-card dark:border-[#333333]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-4 h-4 dark:text-[#34495E]" />
        </div>
      </div>
      <div className="block lg:hidden">
        <Select onValueChange={(value) => setActiveFilter(value)}>
          <SelectTrigger className="w-40 capitalize bg-card">
            <SelectValue placeholder={activeFilter} className="capitalize" />
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
      <div className="hidden lg:flex gap-4 flex-wrap">
        {/* <Button
          className={cn(
            "text-white border border-[#B0BEC5] bg-[#E0E0E0] dark:bg-transparent"
          )}>
          ❤️ Favorite
        </Button> */}
        {filterBtn?.map((item, i) => {
          return (
            <Button
              key={i}
              onClick={() => setActiveFilter(item.value)}
              className={cn(
                "text-white border border-[#B0BEC5]",
                activeFilter != item.value && "bg-[#E0E0E0] dark:bg-transparent"
              )}>
              {item?.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

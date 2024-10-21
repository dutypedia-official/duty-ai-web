"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, CreditCard, RefreshCw, Search } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { toast as sonnerToast } from "sonner";
import { Item, columns } from "./messageColumn";

export const MessagesTable = ({
  items,
  total = 0,
  totalPages = 1,
}: {
  items: Item[];
  total?: number;
  totalPages?: number;
  slug?: string;
}) => {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);
  const { replace, refresh } = useRouter();
  const [isDownloadPending, startDownloadTransition] = useTransition();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setFocus(true);
    }
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 700);

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex w-full relative mx-auto pb-6")}>
      <div className={cn("transition-all duration-300 bg-background w-full")}>
        <div className="border rounded-md">
          <div className="flex justify-between flex-wrap gap-5 px-4 py-2 bg-accent dark:bg-card rounded-t-md">
            <div className="flex gap-4 flex-wrap">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => refresh()} variant={"outline"}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="">
              <div
                className={cn(
                  "flex h-10 items-center border rounded-md transition-all duration-300",
                  focus ? "w-52 lg:w-72" : "w-32"
                )}>
                <Button variant={"ghost"} onClick={handleClick}>
                  <Search className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" />
                <Input
                  type="text"
                  defaultValue={searchParams.get("q")?.toString()}
                  ref={inputRef}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  placeholder="Search..."
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  className="border-none bg-transparent focus:border-none focus:outline-none focus:appearance-none focus-visible:!ring-offset-0 outline-none appearance-none ring-0 focus:ring-0 focus-visible:!ring-0 placeholder:normal-case h-auto w-full"
                />
              </div>
            </div>
          </div>
          <DataTable
            total={total}
            totalPages={totalPages}
            columns={columns}
            data={items}
            style={false}
          />
        </div>
      </div>
    </div>
  );
};

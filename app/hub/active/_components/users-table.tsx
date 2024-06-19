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
import { ArrowDownToLine, RefreshCw, Search } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "sonner";
import { User, columns } from "./user-columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const UsersTable = ({
  invoices,
  total = 0,
  totalPages = 1,
}: {
  invoices: User[];
  total?: number;
  totalPages?: number;
}) => {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);
  const { replace, refresh } = useRouter();
  const [isDownloadPending, startDownloadTransition] = useTransition();

  const params = new URLSearchParams(searchParams);
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

  return (
    <>
      <div className={cn("flex w-full relative mx-auto pb-6")}>
        <div className={cn("transition-all duration-300 bg-background w-full")}>
          <div className="border rounded-md">
            <div className="flex justify-between flex-wrap gap-5 px-4 py-2">
              <div className="flex gap-4">
                {/* <Button variant="outline">
                  Export CSV <ArrowDownToLine className="w-4 h-4 ml-2" />
                </Button> */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button onClick={() => refresh()} variant={"outline"}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Refresh</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {/* <div className="flex items-center gap-4">
                <Select
                  value={searchParams.get("sortBy")?.toString()}
                  onValueChange={(value) => {
                    params.set("sortBy", value);
                    replace(`${pathname}?${params.toString()}`, {
                      scroll: false,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at">Join date</SelectItem>
                    <SelectItem value="last_active_at">Last active</SelectItem>
                  </SelectContent>
                </Select>
                <div
                  className={cn(
                    "flex h-10 items-center border rounded-md transition-all duration-300"
                  )}
                >
                  <Input
                    type="text"
                    defaultValue={searchParams.get("q")?.toString()}
                    ref={inputRef}
                    placeholder="Search..."
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                  />
                </div>
              </div> */}
            </div>
            <DataTable
              total={total}
              totalPages={totalPages}
              columns={columns}
              data={invoices}
              style={false}
            />
          </div>
        </div>
        <div>{/* <InvoiceDetails /> */}</div>
      </div>
    </>
  );
};

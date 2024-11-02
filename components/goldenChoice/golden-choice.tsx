import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useStockData from "@/lib/hooks/useStockData";
import { cn } from "@/lib/utils";
import { ChevronLeft, Search, X } from "lucide-react";
import { MdPlayCircleFilled } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { VideoDialog } from "./video-dialog";
import { useState } from "react";

export const GoldenChoice = ({ open, setOpen }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videoModal, setVideoModal] = useState(false);
  const { marketData } = useStockData();

  // const filterMData = marketData?.filter((stock: any) =>
  //   stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  console.log("marketData", marketData);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={"top"}
        className="w-full h-full bg-white dark:bg-[#1E1E1E] p-0 ring-0 outline-none focus:ring-0 focus-within:ring-0">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <X
          onClick={() => setOpen(false)}
          className="cursor-pointer w-5 h-5 lg:w-7 lg:h-7 text- z-50 text-foreground absolute top-4 right-5"
        />

        <div className="w-full h-full flex items-center">
          <div
            className="container mx-auto w-full h-full max-w-[972px] bg-background dark:bg-[#1E1E1E]
          ">
            <div className="flex flex-col lg:flex-row justify-between gap-4 sticky top-0 bg-background dark:bg-[#1E1E1E] py-10 z-10">
              <div className="flex items-center">
                {/* <div className="w-10 lg:hidden">
                  <ChevronLeft className="" /> 
                </div> */}
                <h1 className="text-center mx-auto text-2xl lg:text-3xl font-semibold text-[#366000] dark:text-[#FFD700]">
                  Select 3 stock
                </h1>
                {/* <div className="w-10 lg:hidden"></div> */}
              </div>
              <div className="w-full sm:w-64 rounded-3xl p-[1px] bg-gradient-to-r from-[#FFD700] dark:from-[#333333] to-[#F0F2F5] dark:to-[#1e1e1e]">
                <div className="relative">
                  <Search className="absolute top-1/2 left-5 -translate-y-1/2 w-4 h-4 dark:text-[#8B7500]" />
                  <Input
                    placeholder="Search"
                    className="rounded-3xl text-sm placeholder:text-sm placeholder:dark:text-[#8B7500] w-full pl-12 pr-5 bg-card border-none focus-visible:ring-0 ring-offset-[1E1E1E]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="h-full max-h-[calc(100vh-48vh)] lg:max-h-[calc(100vh-40vh)]">
              <div className="max-h-[calc(100vh-48vh)] lg:max-h-[calc(100vh-41vh)] rounded-lg h-full bg-gradient-to-r from-[#FFD700] to-[#F0F2F5] dark:to-[#0D0D0D] sticky top-0 z-50 overflow-hidden">
                <div className="p-[1px] h-full">
                  <div className="flex flex-col overflow-y-auto h-full rounded-lg">
                    {marketData?.map((item: any, i: number) => {
                      const name = item.symbol;
                      const logoUrl = `https://s3-api.bayah.app/cdn/symbol/logo/${item.symbol}.svg`;

                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex justify-between p-3 my-[0.5px] bg-[#F5F5F5] dark:bg-gradient-to-l from-[#171717] to-[#0D0D0D]"
                          )}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 lg:w-8 h-6 lg:h-8">
                              <AvatarImage src={logoUrl} />
                              <AvatarFallback className="border-none outline-none bg-[#F0F3FA] text-black font-semibold">
                                {name?.[0]}
                              </AvatarFallback>
                            </Avatar>

                            <h3 className="text-[#6B6B6B] dark:text-[#F0F0F0] text-sm">
                              {name}
                            </h3>
                          </div>
                          <div className="">
                            <Button
                              variant={"outline"}
                              className="rounded-full bg-transparent hover:bg-transparent border-[#D4AF37] text-[#8B7500] hover:text-[#8B7500]">
                              Select
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sticky bottom-0 py-10 bg-background dark:bg-[#1E1E1E]">
              <div className="flex justify-center">
                <div
                  onClick={() => {
                    setVideoModal(true);
                  }}
                  className="inline-flex items-center gap-4 justify-center cursor-pointer">
                  <p className="text-[#366000] dark:text-[#FFD700] text-xs lg:text-sm">
                    ভিডিও টি দেখুন
                  </p>
                  <MdPlayCircleFilled />
                </div>
              </div>
              <div className="flex justify-center">
                <Button className="bg-[#FFD700]/30 hover:bg-[#FFD700]/30 w-full max-w-md h-auto py-4">
                  Start
                </Button>
              </div>
            </div>
          </div>
        </div>
        <VideoDialog open={videoModal} setOpen={setVideoModal} />
      </SheetContent>
    </Sheet>
  );
};

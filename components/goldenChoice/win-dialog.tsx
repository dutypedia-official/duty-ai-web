import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useVipSignal from "@/lib/hooks/useVipSignal";
import Image from "next/image";
import useChat from "@/lib/hooks/useChat";
import { cn, useColorScheme } from "@/lib/utils";
import { ViewMoreDialog } from "./view-more";
import Lottie from "lottie-react";
import confettinew from "@/public/confettie-new.json";
import confettiCenter from "@/public/confetti-center.json";
import confetti3 from "@/public/confetti-3.json";

export const WinDialog = () => {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [halfwayDone, setHalfwayDone] = useState(false);

  const { clearSelectStock, setAnswer, answer, setDetails } = useVipSignal();
  const {
    setOpenGolden,
    setProcessingModal,
    winModal,
    setWinModal,
    setViewMore,
  } = useChat();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (winModal === true) {
      setProcessingModal(false);
    }
  }, [winModal]);

  const specific = (details: any) =>
    answer.stocks.find((stock: any) => stock.name === details);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHalfwayDone(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [winModal]);

  console.log("answer-------", answer);

  return (
    <AlertDialog open={winModal} onOpenChange={setWinModal}>
      <AlertDialogContent className="w-full max-w-screen-md h-full max-h-[calc(100vh-10vh)] overflow-y-auto !rounded-none lg:!rounded-3xl bg-[#F0F2F5] dark:bg-[#121212] px-5 lg:px-10 !py-0">
        <AlertDialogTitle className="hidden"></AlertDialogTitle>
        <AlertDialogDescription className="hidden"></AlertDialogDescription>
        {halfwayDone && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <Image
              src={isDark ? "/confetti-dark.png" : "/confetti-light.png"}
              alt={"confetti"}
              width={300}
              height={100}
              className="w-full h-full object-contain opacity-20"
            />
          </div>
        )}

        <div className="w-full h-full z-50 absolute top-0 -left-40">
          <Lottie
            className="flex-1 w-full h-full mx-auto"
            animationData={confettinew}
            autoPlay
            loop={false}
          />
        </div>
        <div className="w-full h-full z-50 absolute top-0 left-0">
          <Lottie
            className="flex-1 w-full h-full mx-auto"
            animationData={confettinew}
            autoPlay
            loop={false}
          />
        </div>
        <div className="w-full h-full z-50 absolute top-0 left-40">
          <Lottie
            className="flex-1 w-full h-full mx-auto"
            animationData={confettinew}
            autoPlay
            loop={false}
          />
        </div>

        <div className="flex flex-col justify-between h-full w-full max-w-[580px] mx-auto relative z-50">
          <div className="py-5 lg:p-5 h-full">
            <div className="flex flex-row flex-nowrap shadow-xl rounded-xl mt-16">
              <div className="h-48 sm:h-56 w-1/3 lg:w-[35%] rounded-l-xl bg-gradient-to-t from-[#Ffffff] to-[#Ffffff] dark:from-[#A6A9AD] dark:to-[#D1D5DB]">
                <div className="flex flex-col gap-4 h-full justify-center items-center">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <Avatar className="w-8 h-8 sm:w-14 sm:h-14 aspect-square border-[2.5px] border-[#CBCBCB]">
                      <AvatarImage
                        src={`https://s3-api.bayah.app/cdn/symbol/logo/${answer?.leaderboard["2nd"]?.stock}.svg`}
                      />
                      <AvatarFallback className="font-semibold bg-white text-black">
                        {answer?.leaderboard["2nd"]?.stock[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="">
                      <h2 className="text-xs sm:text-base font-semibold text-[#FFD700] dark:text-[#8B7500] text-center line-clamp-1">
                        {answer?.leaderboard["2nd"]?.stock}
                      </h2>
                      <h3 className="text-[#777777] text-xs sm:text-sm font-bold text-center">
                        {answer?.leaderboard["2nd"]?.score} point
                      </h3>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-[#EFEBEB] px-1.5 rounded-2xl">
                      <h1 className="text-[#8B7500] font-bold text-sm sm:text-xl">
                        2nd
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-48 sm:h-56 w-1/3 lg:w-[30%] bg-gradient-to-t from-[#FFF3B0] to-[#F0F2F5] dark:from-[#4A0202] dark:to-[#8B0000]">
                <div className="flex flex-col gap-4 h-full justify-center items-center relative -top-16">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="p-[1px] bg-gradient-to-b from-[#FADF7D] to-[#F5F2E2] rounded-full dark:from-[#101010] dark:to-[#8B0000]">
                      <Image
                        alt="crown"
                        src={"/crown.svg"}
                        width={50}
                        height={50}
                        className="absolute -top-[5px] left-1/2 -translate-x-1/2"
                      />
                      <div className="p-3 bg-gradient-to-b from-[#F3F4F6] to-[#F5F2DE] dark:from-[#101010] dark:to-[#8B0000] rounded-full">
                        <div className="p-[1px] bg-gradient-to-b from-[#FADF7D] to-[#F5F2E2] rounded-full relative">
                          <Avatar className="w-8 h-8 sm:w-14 sm:h-14 aspect-square border-none">
                            <AvatarImage
                              src={`https://s3-api.bayah.app/cdn/symbol/logo/${answer?.leaderboard["1st"]?.stock}.svg`}
                            />
                            <AvatarFallback className="font-semibold bg-white dark:bg-gradient-to-r from-[#E1B7A7] to-[#C0785A] text-black">
                              {answer?.leaderboard["1st"]?.stock[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <h2 className="text-xs sm:text-base font-semibold text-[#8B7500] dark:text-[#FFD700] text-center line-clamp-1">
                        {answer?.leaderboard["1st"]?.stock}
                      </h2>
                      <h3 className="text-[#777777] dark:text-white text-xs sm:text-sm font-bold text-center">
                        {answer?.leaderboard["1st"]?.score} point
                      </h3>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-[#FAE773] dark:bg-[#E80000] px-2 rounded-2xl">
                      <h1 className="text-[#8B7500] dark:text-white font-bold text-sm sm:text-xl">
                        1st
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-48 sm:h-56 w-1/3 lg:w-[35%] rounded-r-xl bg-gradient-to-t from-[#Ffffff] to-[#Ffffff] dark:from-[#A6A9AD] dark:to-[#D1D5DB]">
                <div className="flex flex-col gap-4 h-full justify-center items-center">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <Avatar className="w-8 h-8 sm:w-14 sm:h-14 aspect-square border-[2.5px] border-[#CBCBCB]">
                      <AvatarImage
                        src={`https://s3-api.bayah.app/cdn/symbol/logo/${answer?.leaderboard["3rd"]?.stock}.svg`}
                      />
                      <AvatarFallback className="font-semibold bg-white text-black">
                        {answer?.leaderboard["3rd"]?.stock[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="">
                      <h2 className="text-xs sm:text-base font-semibold text-[#FFD700] dark:text-[#8B7500] text-center line-clamp-1">
                        {answer?.leaderboard["3rd"]?.stock}
                      </h2>
                      <h3 className="text-[#777777] text-xs sm:text-sm font-bold text-center">
                        {answer?.leaderboard["3rd"]?.score} point
                      </h3>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-[#EFEBEB] px-1.5 rounded-2xl">
                      <h1 className="text-[#8B7500] font-bold text-sm sm:text-xl">
                        3rd
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative py-8 lg:py-16">
              {isDark ? (
                <Image
                  alt="leaderboard"
                  src={"/leaderboard-dark.svg"}
                  width={200}
                  height={50}
                  className="object-contain w-full h-full"
                />
              ) : (
                <Image
                  alt="leaderboard"
                  src={"/leaderboard.svg"}
                  width={200}
                  height={50}
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            <div className="">
              <div className="">
                <div className="flex flex-col shadow rounded-xl bg-gradient-to-r from-[#FFD700] to-[#F0F2F5] dark:from-transparent dark:to-transparent px-[1px]">
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#F0F2F5] p-3 flex justify-between rounded-t-xl">
                    <div className={cn("flex items-center gap-2")}>
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={``} />
                        <AvatarFallback className="border-none outline-none bg-[#F0F3FA] text-black font-semibold text-xs">
                          {answer?.leaderboard["1st"]?.stock[0]}
                        </AvatarFallback>
                      </Avatar>

                      <h3 className="text-[#6B6B6B] dark:text-[#8B7500] text-sm line-clamp-1">
                        {answer?.leaderboard["1st"]?.stock}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-14">
                        <Image
                          alt="badge"
                          src="/badge.svg"
                          width={20}
                          height={20}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          setDetails(
                            specific(answer?.leaderboard["1st"].stock)
                          );
                          setViewMore(true);
                        }}
                        variant={"outline"}
                        className="bg-transparent hover:bg-transparent rounded-3xl text-[#8B7500] hover:text-[#8B7500] border-[#B8860B] px-6 py-4">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#F0F2F5] dark:from-[#D3D3D3] dark:to-[#A9A9A9] h-[1px]"></div>
                  <div className="bg-[#F5F5F5] p-3 flex justify-between dark:bg-gradient-to-b dark:from-[#D3D3D3] dark:to-[#A9A9D3]">
                    <div className={cn("flex items-center gap-2")}>
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={``} />
                        <AvatarFallback className="border-none outline-none bg-[#F0F3FA] text-black font-semibold text-xs">
                          {answer?.leaderboard["2nd"]?.stock[0]}
                        </AvatarFallback>
                      </Avatar>

                      <h3 className="text-[#6B6B6B] dark:text-[#F0F0F0] text-sm line-clamp-1">
                        {answer?.leaderboard["2nd"]?.stock}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-14"></div>
                      <Button
                        onClick={() => {
                          setDetails(
                            specific(answer?.leaderboard["2nd"].stock)
                          );
                          setViewMore(true);
                        }}
                        variant={"outline"}
                        className="bg-transparent hover:bg-transparent rounded-3xl text-[#8B7500] hover:text-[#8B7500] border-[#B8860B] px-6 py-4">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#F0F2F5] dark:from-[#D3D3D3] dark:to-[#A9A9A9] h-[1px]"></div>
                  <div className="bg-[#F5F5F5] p-3 flex justify-between rounded-b-xl dark:bg-gradient-to-b dark:from-[#D3D3D3] dark:to-[#A9A9D3]">
                    <div className={cn("flex items-center gap-2")}>
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={``} />
                        <AvatarFallback className="border-none outline-none bg-[#F0F3FA] text-black font-semibold text-xs">
                          {answer?.leaderboard["3rd"]?.stock[0]}
                        </AvatarFallback>
                      </Avatar>

                      <h3 className="text-[#6B6B6B] dark:text-[#F0F0F0] text-sm line-clamp-1">
                        {answer?.leaderboard["3rd"]?.stock}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-14"></div>
                      <Button
                        onClick={() => {
                          setDetails(
                            specific(answer?.leaderboard["3rd"].stock)
                          );
                          setViewMore(true);
                        }}
                        variant={"outline"}
                        className="bg-transparent hover:bg-transparent rounded-3xl text-[#8B7500] hover:text-[#8B7500] border-[#B8860B] px-6 py-4">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-10">
              <Button
                onClick={() => {
                  clearSelectStock();
                  setAnswer(null);
                  setWinModal(false);
                  setOpenGolden(false);
                  setProcessingModal(false);
                }}
                className="bg-gradient-to-l from-[#F6B253] to-[#FF9500] w-full max-w-md h-auto py-4 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

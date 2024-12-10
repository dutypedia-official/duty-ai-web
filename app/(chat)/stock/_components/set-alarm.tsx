"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUi from "@/lib/hooks/useUi";
import { cn, useColorScheme } from "@/lib/utils";
import { BellPlus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineEditNotifications } from "react-icons/md";

export const SetAlarm = ({
  currentAlarm,
  activeTab,
  setActiveTab,
  targetPrice,
  setTargetPrice,
  inputText,
  currentAiAlerm,
  setInputText,
  error,
  handelSetAlerm,
  loading,
  handelDeleteAlerm,
  handelSetAiAlerm,
  handelDeleteAiAlerm,
}: {
  currentAlarm: any;
  activeTab: any;
  setActiveTab: (val: any) => void;
  targetPrice: any;
  setTargetPrice: any;
  inputText: any;
  currentAiAlerm: any;
  setInputText: any;
  error: any;
  handelSetAlerm: () => void;
  loading: any;
  handelDeleteAlerm: () => void;
  handelSetAiAlerm: () => void;
  handelDeleteAiAlerm: () => void;
}) => {
  const { setSelectedAlarmShit, setSelectedStock, alarmSheet, setAlarmSheet } =
    useUi();
  const colorscheme = useColorScheme();
  const isDark = colorscheme === "dark";
  console.log(currentAlarm);
  return (
    <AlertDialog open={alarmSheet} onOpenChange={setAlarmSheet}>
      <AlertDialogContent className="py-10 bg-gradient-to-b from-[#FFFFFF] dark:from-[#1C1C1E] to-[#F3F4F6] dark:to-[#2A2A2D] border-t border-t-[#CFCFCF] dark:border-t-[#3A3A3C] !rounded-2xl h-full max-h-[calc(100vh-30vh)]">
        <div className="absolute right-0 top-0">
          <AlertDialogCancel className="rounded-full border-none bg-transparent hover:bg-transparent">
            <X className="w-5 h-5" />
          </AlertDialogCancel>
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto">
          <div className="flex flex-nowrap flex-shrink-0 bg-[#E0E0E0] dark:bg-[#2C2C2E] rounded-xl overflow-hidden h-10 sticky top-0 backdrop-blur-sm backdrop-filter">
            <button
              onClick={() => {
                setActiveTab("priceAlarm");
              }}
              className={cn(
                "w-1/2 px-3 py-2 h-10 text-[#757575] dark:text-[#D1D1D1] flex justify-center items-center gap-1",
                activeTab === "priceAlarm" &&
                  "bg-[#D6F7F9] dark:bg-[#215B5D] text-[#00796B]"
              )}>
              <p className="text-center font-bold">Price alarm</p>
            </button>
            <button
              onClick={() => {
                setActiveTab("aiAlarm");
              }}
              className={cn(
                "w-1/2 px-3 py-2 h-10 text-[#757575] dark:text-[#D1D1D1] flex justify-center items-center gap-1",
                activeTab === "aiAlarm" &&
                  "bg-[#D6F7F9] dark:bg-[#215B5D] text-[#00796B]"
              )}>
              <Image
                src={
                  activeTab === "aiAlarm"
                    ? "/magicActive.svg"
                    : isDark
                    ? "/magicInActiveDark.svg"
                    : "/magicInActiveLight.svg"
                }
                width={20}
                height={20}
                alt="icon"
              />

              <p className="text-center font-bold">Ai alarm</p>
            </button>
          </div>

          <div className="flex-1">
            {activeTab === "priceAlarm" && (
              <div className="">
                <label className="space-y-3">
                  <p className="text-xl font-semibold">Enter Price</p>
                  <Input
                    placeholder="00.00"
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 text-center dark:bg-[#2C2C2E] dark:border-[#3A3A3C] h-11"
                    value={targetPrice || `${currentAlarm?.price || ""}`}
                    onChange={(e: any) =>
                      setTargetPrice(e.target.value.replace(/[^0-9.]/g, ""))
                    }
                  />
                </label>
              </div>
            )}
            {activeTab === "aiAlarm" && (
              <div className="">
                <label className="space-y-3">
                  <p className="text-xl font-semibold">Type your Instruction</p>
                  <Textarea
                    maxLength={120}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="If market go 50% above the moving avarage give em signal also if this stock perform so goodthen  give em signal"
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 dark:bg-[#2C2C2E] dark:border-[#3A3A3C] h-11 text-left max-h-[25dvh] resize-none"
                    value={inputText || `${currentAiAlerm?.prompt || ""}`}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={currentAiAlerm?.prompt ? true : false}
                  />
                  {error && <p className="text-xs text-red-500">{error}</p>}
                  <p className="text-xs dark:text-[#D1D1D1]">
                    If market go 50% above the moving avarage give em signal
                    also"Write what you want the AI to do{" "}
                    <span
                      className={cn(
                        inputText?.length === 120 && "text-red-500"
                      )}>
                      (max 120 characters)
                    </span>
                    . Clear instructions help the AI understand better. The AI
                    will watch your stock 24/7 and notify you.{" "}
                  </p>
                </label>
              </div>
            )}
          </div>

          {activeTab === "priceAlarm" && (
            <div className="flex flex-col gap-3 sticky bottom-0 backdrop-blur-sm">
              <Button
                onClick={() => {
                  handelSetAlerm();
                }}
                size={"lg"}
                // disabled={
                //   loading ||
                //   parseFloat(targetPrice) < 1 ||
                //   !targetPrice ||
                //   parseFloat(targetPrice) == currentAlerm?.price
                // }
                className={cn(
                  "text-white font-bold rounded-xl bg-gradient-to-b from-[#64B5F6] dark:from-[#6C63FF] to-[#1976D2] dark:to-[#3D4DB7] w-full",
                  targetPrice.trim() ? "opacity-100" : "opacity-50"
                )}>
                {loading ? "Please wait..." : "Set Alarm"}
              </Button>
              {currentAlarm && (
                <Button
                  onClick={() => {
                    handelDeleteAlerm();
                  }}
                  disabled={loading}
                  size={"lg"}
                  className="text-white font-bold rounded-xl bg-gradient-to-b from-[#EF9A9A] dark:from-[#D64B4B] to-[#D32F2F] dark:to-[#8F2B2B] w-full">
                  {loading ? "Please wait..." : "Delete Alarm"}
                </Button>
              )}
            </div>
          )}
          {activeTab === "aiAlarm" && (
            <div className="flex flex-col gap-3 sticky bottom-0 backdrop-blur-sm">
              <Button
                onClick={() => {
                  handelSetAiAlerm();
                }}
                size={"lg"}
                disabled={
                  inputText?.length === 0 || currentAiAlerm?.prompt
                    ? true
                    : false
                }
                className={cn(
                  "text-white font-bold rounded-xl bg-gradient-to-b from-[#64B5F6] dark:from-[#6C63FF] to-[#1976D2] dark:to-[#3D4DB7] w-full",
                  inputText?.length > 0 ? "opacity-100" : "opacity-50"
                )}>
                {loading ? "Please wait..." : "Set Alarm"}
              </Button>
              {currentAiAlerm && (
                <Button
                  onClick={() => {
                    handelDeleteAiAlerm();
                  }}
                  disabled={loading}
                  size={"lg"}
                  className="text-white font-bold rounded-xl bg-gradient-to-b from-[#EF9A9A] dark:from-[#D64B4B] to-[#D32F2F] dark:to-[#8F2B2B] w-full">
                  {loading ? "Please wait..." : "Delete Alarm"}
                </Button>
              )}
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

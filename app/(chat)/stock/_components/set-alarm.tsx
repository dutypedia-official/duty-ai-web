"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellPlus } from "lucide-react";
import { MdOutlineEditNotifications } from "react-icons/md";

export const SetAlarm = ({
  targetPrice,
  setTargetPrice,
  currentAlerm,
  loading,
  handelSetAlerm,
  handelDeleteAlerm,
}: {
  targetPrice: any;
  setTargetPrice: any;
  currentAlerm: any;
  loading: any;
  handelSetAlerm: () => void;
  handelDeleteAlerm: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-[#EAEDED] bg-[#EAEDED] hover:dark:bg-[#333333] dark:bg-[#333333] border border-[#EAEDED] dark:border-[#333333] text-[#757575] dark:text-white font-normal min-w-max text-[10px] sm:text-sm h-0 w-0 p-4">
          {currentAlerm ? (
            <MdOutlineEditNotifications className="w-4 h-4 text-[#5188D4] dark:text-white mr-0.5" />
          ) : (
            <BellPlus className="w-4 h-4 text-[#5188D4] dark:text-white mr-0.5" />
          )}
          {currentAlerm ? "Edit Alerm" : "Set Alarm"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-10">
        <div className="absolute right-0 top-0">
          <AlertDialogCancel className="rounded-full">X</AlertDialogCancel>
        </div>
        <div className="flex flex-col gap-5">
          <Input
            placeholder="00:00"
            className="text-center"
            value={targetPrice}
            onChange={(e: any) =>
              setTargetPrice(e.target.value.replace(/[^0-9.]/g, ""))
            }
          />
          <Button
            onClick={handelSetAlerm}
            size={"lg"}
            disabled={
              loading ||
              parseFloat(targetPrice) < 1 ||
              parseFloat(targetPrice) == currentAlerm?.price
            }
            className="text-white">
            {loading ? "Please wait..." : "Set Alarm"}
          </Button>
          {currentAlerm && (
            <Button
              onClick={handelDeleteAlerm}
              variant={"destructive"}
              size={"lg"}
              className="text-white">
              {loading ? "Please wait..." : "Delete Alarm"}
            </Button>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

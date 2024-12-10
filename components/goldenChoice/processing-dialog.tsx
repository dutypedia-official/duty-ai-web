"use client";

import { apiClient } from "@/lib/api";
import useChat from "@/lib/hooks/useChat";
import useUi from "@/lib/hooks/useUi";
import useVipSignal from "@/lib/hooks/useVipSignal";
import { cn } from "@/lib/utils";
import collecting from "@/public/collecting.json";
import handoff from "@/public/handoff.json";
import optimize from "@/public/optimize.json";
import search from "@/public/search.json";
import { useAuth } from "@clerk/nextjs";
import Lottie from "lottie-react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export const ProcessingDialog = () => {
  const { setOpenGolden, processingModal, setProcessingModal, setWinModal } =
    useChat();
  const { selectStock, clearSelectStock, answer, setAnswer } = useVipSignal();
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();
  const { mainServerAvailable } = useUi();
  const [restartCount, setRestartCount] = useState(0);
  // Initialize processStep with the correct typing
  const [processStep, setProcessStep] = useState<
    { label: string; isProcessing: boolean; isCompleted: boolean }[]
  >([]);

  console.log("processing");

  const fetchData = async () => {
    try {
      const token = await getToken();
      const client = apiClient();
      const { data } = await client.post(
        "/chat/compare",
        {
          symbols: selectStock,
        },
        token,
        {}
        // mainServerAvailable
      );

      setAnswer(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Update processStep whenever selectStock changes
    setProcessStep([
      ...(selectStock as string[]).map((stock) => ({
        label: stock,
        isProcessing: false,
        isCompleted: false,
      })),
      {
        label: "Analysis fundamental",
        isProcessing: false,
        isCompleted: false,
      },
      {
        label: "Analysis technical",
        isProcessing: false,
        isCompleted: false,
      },
      {
        label: "Our Algorithm",
        isProcessing: false,
        isCompleted: false,
      },
    ]);
  }, [selectStock]);

  useEffect(() => {
    fetchData();
  }, [processingModal]);

  useEffect(() => {
    if (answer) {
      setWinModal(true);
      setProcessingModal(false);
      console.log("answer", answer);
    }
  }, [answer]);

  useEffect(() => {
    let isCancelled = false;
    let currentStep = 0;
    let stepStartTime: number;

    const updateStep = () => {
      if (isCancelled || currentStep >= processStep.length) return;

      stepStartTime = Date.now();

      setProcessStep((prevSteps) =>
        prevSteps.map((step, index) => {
          if (index === currentStep) {
            return { ...step, isProcessing: true };
          } else if (index === currentStep - 1) {
            return { ...step, isProcessing: false, isCompleted: true };
          }
          return step;
        })
      );

      // Process the current step
      const stepTimeout = setTimeout(() => {
        if (isCancelled) return;

        if (currentStep === processStep.length - 1) {
          // Last step
          if (answer) {
            setProcessStep((prevSteps) =>
              prevSteps.map((step, index) => {
                if (index === currentStep) {
                  return { ...step, isProcessing: false, isCompleted: true };
                }
                return step;
              })
            );
          } else {
            // If no answer after 2 minutes, restart the last step and server request
            const elapsedTime = Date.now() - stepStartTime;
            if (elapsedTime >= 120000) {
              // 2 minutes in milliseconds
              setRestartCount((prev) => prev + 1);
              fetchData(); // Restart server request
              updateStep(); // Restart last step
              console.log("Restarting last step");
            } else {
              // Continue waiting
              updateStep();
            }
          }
        } else {
          currentStep++;
          updateStep();
        }
      }, 4000);

      return () => clearTimeout(stepTimeout);
    };

    updateStep();

    return () => {
      isCancelled = true;
    };
  }, [processStep.length, answer, restartCount]);

  return (
    <>
      <AlertDialog open={processingModal} onOpenChange={setProcessingModal}>
        <AlertDialogContent className="w-full max-w-screen-md h-full lg:max-h-[calc(100vh-10vh)] !rounded-none lg:!rounded-3xl overflow-auto">
          <AlertDialogTitle className="hidden"></AlertDialogTitle>
          <AlertDialogDescription className="hidden"></AlertDialogDescription>

          <div className="flex flex-col justify-between h-full overflow-auto">
            <div className="pb-4 text-center font-semibold text-2xl text-[#8B7500]">
              Processing
            </div>
            <div className="py-5 lg:p-5 h-full">
              <div className="flex flex-col gap-2">
                {processStep?.map((item: any, index: number) => {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div
                        className={cn(
                          "bg-gradient-to-r from-[#91C6F0] to-[#F0F2F5] rounded-md p-[1px]",
                          item?.isCompleted && "from-[#FFD700] to-[#F0F2F5]",
                          !item?.isCompleted &&
                            item?.isProcessing &&
                            "from-[#FFD700] to-[#F0F2F5]"
                        )}>
                        <div
                          className={cn(
                            "rounded-md bg-gradient-to-r from-background to-background",
                            item?.isCompleted &&
                              "from-[#FFD700] dark:from-[#333333] to-[#F0F2F5] dark:to-[#0F0F0F]"
                          )}>
                          <div className="flex justify-between gap-4 p-2">
                            <div className="flex-1">
                              <p
                                className={cn(
                                  "text-sm line-clamp-1",
                                  item?.isCompleted && "dark:text-[#FFD700]",
                                  !item?.isCompleted &&
                                    item?.isProcessing &&
                                    "text-[#FFD700]"
                                )}>
                                {selectStock.some(
                                  (data) => item.label === data
                                ) && "Collecting"}{" "}
                                {item.label}{" "}
                                {selectStock.some(
                                  (data) => item.label === data
                                ) && "Data"}
                              </p>
                            </div>
                            <div className="w-8 h-full">
                              {item.isCompleted && (
                                <div className="w-5 aspect-square rounded-full bg-gradient-to-r from-[#91C6F0] dark:from-[#FFD700] to-[#F0F2F5] dark:to-[#F0F2F5] flex items-center justify-center">
                                  <Check className="w-4 h-4 text-[#F0F2F5] dark:text-[#121212]" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {item.isProcessing && (
                        <div className="">
                          {!item?.label.includes("Analysis fundamental") &&
                            !item?.label.includes("Analysis technical") &&
                            !item?.label.includes("Our Algorithm") && (
                              <Lottie
                                className="flex-1 w-2/3 lg:w-6/12 mx-auto"
                                animationData={
                                  index === 1 ? handoff : collecting
                                }
                                autoPlay
                                loop
                              />
                            )}
                          {item?.label.includes("Analysis fundamental") && (
                            <Lottie
                              className="flex-1 w-2/3 lg:w-6/12 mx-auto"
                              animationData={optimize}
                              autoPlay
                              loop
                            />
                          )}
                          {item?.label.includes("Analysis technical") && (
                            <Lottie
                              className="flex-1 w-2/3 lg:w-6/12 mx-auto"
                              animationData={search}
                              autoPlay
                              loop
                            />
                          )}
                          {item?.label.includes("Our Algorithm") && (
                            <Lottie
                              className="flex-1 w-2/3 lg:w-6/12 mx-auto"
                              animationData={search}
                              autoPlay
                              loop
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-4 flex items-center justify-center">
              <Button
                onClick={() => {
                  clearSelectStock();
                  setProcessingModal(false);
                  setOpenGolden(false);
                  setAnswer(null);
                }}
                className="bg-gradient-to-l from-[#F6B253] to-[#FF9500] w-full max-w-md h-auto py-4 text-white shadow-[0px_0px_5px_#9B9B9B]">
                Cancel
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

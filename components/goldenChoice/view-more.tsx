import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useChat from "@/lib/hooks/useChat";
import useVipSignal from "@/lib/hooks/useVipSignal";
import { useColorScheme } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export const ViewMoreDialog = () => {
  const { clearSelectStock, setAnswer, answer, details, setDetails } =
    useVipSignal();
  const { viewMore, setViewMore } = useChat();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const data = details;
  console.log("details", details);

  if (!data) {
    return null;
  }
  return (
    <>
      <AlertDialog open={viewMore} onOpenChange={setViewMore}>
        <AlertDialogContent className="w-full max-w-screen-md h-full max-h-[calc(100vh-10vh)] !rounded-none lg:!rounded-3xl bg-[#F0F2F5] dark:bg-[#121212] p-0">
          <AlertDialogTitle className="hidden"></AlertDialogTitle>
          <AlertDialogDescription className="hidden"></AlertDialogDescription>
          <div className="h-full w-full overflow-y-auto pb-5">
            <div className="sticky top-0 left-0 py-10 w-full backdrop-blur rounded-t-3xl z-20">
              <div className="flex items-center flex-nowrap max-w-[580px] mx-auto ">
                <div className="w-14">
                  <button
                    onClick={() => {
                      setViewMore(false);
                    }}
                    className="w-8 h-8 bg-white  dark:bg-black rounded-full shadow-md flex items-center justify-center">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="w-full flex-1 flex items-center justify-center text-center">
                  <h1 className="max-w-sm line-clamp-1 text-[#8B7500] dark:text-[#FFD700] text-2xl font-semibold">
                    {data?.name}
                  </h1>
                </div>
                <div className="w-14"></div>
              </div>
            </div>

            <div className="max-w-[580px] mx-auto flex flex-col gap-8 relative">
              <div className="flex flex-col gap-2">
                <h2 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Score
                </h2>
                <h1 className="text-5xl font-bold">{data?.score}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Financial Performance
                </h1>
                <div className="flex flex-col">
                  {Object.keys(data?.financial_performance).map((key) => (
                    <div className="flex justify-between border-b py-3">
                      <p className="capitalize">{key.replace("_", " ")}</p>
                      <p>{data?.financial_performance[key]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Key Performance Metrics
                </h1>
                <div className="flex flex-col">
                  {Object.keys(data?.key_performance_metrics).map((key) => (
                    <div className="flex justify-between border-b py-3">
                      <p className="capitalize">{key.replace("_", " ")}</p>
                      <p>{data?.key_performance_metrics[key]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Technical Analysis
                </h1>
                <div className="">
                  {typeof data?.technical_analysis === "string" ? (
                    <p>{data?.technical_analysis}</p>
                  ) : (
                    Object.keys(data?.technical_analysis).map((key) => (
                      <span className="capitalize">
                        {key.replace("_", " ")}{" "}
                        {typeof data?.technical_analysis[key] === "object"
                          ? JSON.stringify(data?.technical_analysis[key])
                          : data?.technical_analysis[key]}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Investment Analysis
                </h1>
                <p>{data?.investment_analysis}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Overview
                </h1>
                <p>{data?.overview}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Fair Value
                </h1>
                <p>{data?.fair_value}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Total Liabilities
                </h1>
                <p>{data?.total_liabilities}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Overall Assessment
                </h1>
                <p>{data?.overall_assessment}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#8B7500] dark:text-[#FFD700] text-xl font-semibold">
                  Valuation
                </h1>
                <p>{data?.valuation}</p>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

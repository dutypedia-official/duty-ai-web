import React, { useEffect, useRef, useState } from "react";
import { ChartSlider } from "./slider";
import { cn, useColorScheme } from "@/lib/utils";
import { PiSealPercentFill } from "react-icons/pi";
import { ArrowLeftRight } from "lucide-react";
import { MdOutlineShowChart } from "react-icons/md";
import { apiClient } from "@/lib/api";
import { useRouter } from "next/navigation";
import useFeedData from "@/lib/hooks/useFeedData";
import useUi from "@/lib/hooks/useUi";

const MarketOverview = ({ sidebar = false }: { sidebar?: boolean }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [loading, setLoading] = useState(true);
  const { refreash, setRefreash, screenRefresh, setScreenRefresh } = useUi();
  const { indexData, setIndexData } = useFeedData();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const client = apiClient();
  const summaryRef = useRef<HTMLParagraphElement>(null); // Reference to the paragraph element
  const [isTruncated, setIsTruncated] = useState(false); // State to track if text is truncated
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (summaryRef.current) {
      // Check if the text is truncated
      const isTextTruncated =
        summaryRef.current.scrollHeight > summaryRef.current?.clientHeight;
      setIsTruncated(isTextTruncated);
    }
  }, [indexData?.summary]);

  const handleReadMoreToggle = () => {
    setIsExpanded((prev) => !prev); // Toggle between showing full or truncated text
  };

  const fetchData = async (init: boolean = true) => {
    try {
      const { data } = await client.get(`/tools/get-dsebd-index`);
      setIndexData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const tabs = [
    {
      tabName: "DSEX",
      data: [
        {
          title: "Value",
          subtitle: "Current index value",
          value: indexData?.dseXIndex[0],
          icon: <MdOutlineShowChart />,
        },
        {
          title: "Num change",
          subtitle: "Numeric change in value",
          value: indexData?.dseXIndex[1],
          icon: <ArrowLeftRight />,
        },
        {
          title: "Change",
          subtitle: "Percentage change",
          value: indexData?.dseXIndex[2],
          icon: <PiSealPercentFill />,
        },
      ],
    },
    {
      tabName: "DSES",
      data: [
        {
          title: "Value",
          subtitle: "Current index value",
          value: indexData?.dseSIndex[0],
          icon: <MdOutlineShowChart />,
        },
        {
          title: "Num change",
          subtitle: "Numeric change in value",
          value: indexData?.dseSIndex[1],
          icon: <ArrowLeftRight />,
        },
        {
          title: "Change",
          subtitle: "Percentage change",
          value: indexData?.dseSIndex[2],
          icon: <PiSealPercentFill />,
        },
      ],
    },
    {
      tabName: "DS30",
      data: [
        {
          title: "Value",
          subtitle: "Current index value",
          value: indexData?.ds30Index[0],
          icon: <MdOutlineShowChart />,
        },
        {
          title: "Num change",
          subtitle: "Numeric change in value",
          value: indexData?.ds30Index[1],
          icon: <ArrowLeftRight />,
        },
        {
          title: "Change",
          subtitle: "Percentage change",
          value: indexData?.ds30Index[2],
          icon: <PiSealPercentFill />,
        },
      ],
    },
  ];

  const overviewData = [
    {
      title: "Total Trade",
      subtitle: "Total number of shares traded today",
      value: indexData?.totalTrade,
    },
    {
      title: "Total Volume",
      subtitle: "Total shares bought and sold today",
      value: indexData?.totalVolume,
    },
    {
      title: "Total Value in Taka",
      subtitle: "Total money spent on trades today",
      value: indexData?.totalValue,
    },
    {
      title: "Issues Advanced",
      subtitle: "Number of issues that have increased in value",
      value: indexData?.issuesAdvanced,
    },
    {
      title: "Issues Declined",
      subtitle: "Number of issues that have decreased in value",
      value: indexData?.issuesDeclined,
    },
    {
      title: "Issues Unchanged",
      subtitle: "Number of issues with no change in value",
      value: indexData?.issuesUnchanged,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={cn(
        "overflow-auto bg-card-foreground p-5 w-full lg:w-[28rem] ",
        sidebar ? "h-full" : "max-h-[calc(100vh-6.5rem)] rounded-lg"
      )}>
      <div className={cn("flex flex-col gap-5")}>
        <ChartSlider tabs={tabs} />
        <div className="p-3 rounded-lg bg-card flex flex-col gap-5">
          <h1 className="text-base lg:text-xl">Market Overview</h1>
          {overviewData?.map((item: any, i: number) => {
            return (
              <div key={i} className="flex justify-between gap-5">
                <div className="w-2/3">
                  <h4 className="text-sm text-[#34495E] dark:text-[#E0E0E0]">
                    {item?.title}
                  </h4>
                  <p className="text-[10px] text-[#787878] dark:text-[#E0E0E0]">
                    {item?.subtitle}
                  </p>
                </div>
                <div className="w-1/3 flex flex-col items-end justify-start">
                  <p
                    className={cn(
                      "text-sm text-[#2ECC71]",
                      item?.value?.startsWith("-") && "text-[#FF0000]"
                    )}>
                    {item?.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {indexData?.summary && (
          <div className="p-3 rounded-lg bg-card flex flex-col gap-5">
            <h1 className="text-xl text-[#3DC000] dark:text-[#FFD700]">
              Ai summery
            </h1>
            <div className="">
              <p
                ref={summaryRef}
                className={`text-[#424242] dark:text-[#E0E0E0] text-sm font-normal ${
                  isExpanded ? "" : "line-clamp-6"
                }`}>
                {indexData?.summary}
              </p>
              {isTruncated && (
                <span
                  onClick={handleReadMoreToggle}
                  className="text-[#E71919] text-sm font-semibold cursor-pointer">
                  {isExpanded ? "Show Less" : "Read More"}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketOverview;

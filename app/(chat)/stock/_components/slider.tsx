"use client";
import { NDark, NLight } from "@/components/icons/Negative";
import { PDark, PLight } from "@/components/icons/Positive";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, useColorScheme } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SlideContent = ({ item }: { item: any }) => {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isNeg = item?.data?.[2]?.value?.startsWith("-");

  useEffect(() => {
    if (colorScheme !== undefined && isNeg !== undefined) {
      setIsLoading(false); // Stop loading when values are ready
    }
  }, [colorScheme, isNeg]);

  const getIntegerPart = (value: any) => {
    return value && typeof value === "string" ? value.split(".")[0] : "";
  };

  const getDecimalPart = (value: any) => {
    if (value && typeof value === "string") {
      const decimalPart = value.split(".")[1];
      return decimalPart ? decimalPart.substring(0, 2) : "";
    }
    return "";
  };

  if (isLoading) {
    return (
      <Skeleton className="rounded-lg flex-shrink-0 relative w-40 aspect-[152/176] bg-card" />
    );
  }
  return (
    <div
      className={cn(
        "snap-start rounded-lg flex-shrink-0 relative w-40 aspect-[152/176] select-none"
      )}>
      {/* {colorScheme === "dark" ? (
        isNeg ? (
          <NDark />
        ) : (
          <PDark />
        )
      ) : isNeg ? (
        <NLight />
      ) : (
        <PLight />
      )} */}

      <Image
        src={
          colorScheme === "dark"
            ? isNeg
              ? "/negative-dark.svg"
              : "/positive-dark.svg"
            : isNeg
            ? "/negative-light.svg"
            : "/positive-light.svg"
        }
        alt="chart"
        fill
        className="absolute w-full h-full object-contain"
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-2 px-2 pt-2">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-[#6E6E6E] text-sm">{item?.tabName}</h3>
          <div
            className={cn(
              "text-[#20E5FF] text-xs flex items-center flex-nowrap",
              isNeg && "text-[#FF0000]"
            )}>
            {isNeg ? (
              <ArrowDown
                className={cn(
                  "w-4 h-4 text-[#20E5FF]",
                  isNeg && "text-[#FF0000]"
                )}
              />
            ) : (
              <ArrowUp
                className={cn(
                  "w-4 h-4 text-[#20E5FF]",
                  isNeg && "text-[#FF0000]"
                )}
              />
            )}{" "}
            {item?.data?.[2]?.value &&
              getIntegerPart(item?.data?.[2]?.value) +
                "." +
                getDecimalPart(item?.data?.[2]?.value) +
                "%"}
          </div>
        </div>
        {item?.data[0]?.value && (
          <h3 className="text-[#000000] dark:text-[#ffffff] text-xs">
            {getIntegerPart(item?.data[0]?.value)}.
            <span className="text-[#6E6E6E]">
              {getDecimalPart(item?.data[0]?.value)}
            </span>
          </h3>
        )}
        <h4 className="text-[#000000] dark:text-[#6E6E6E] text-xs">
          {item?.data?.[1]?.value &&
            getIntegerPart(item?.data?.[1]?.value) +
              "." +
              getDecimalPart(item?.data?.[1]?.value)}
        </h4>
      </div>
    </div>
  );
};

export const ChartSlider = ({ tabs }: { tabs: any }) => {
  const scrollContainerRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: any) => {
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return; // If not dragging, do nothing
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the scroll speed
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: any) => {
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  return (
    <div
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex gap-5 touch-pan-x overflow-x-scroll whitespace-nowrap cursor-grab">
      {tabs?.map((item: any, i: number) => {
        return <SlideContent item={item} key={i} />;
      })}
    </div>
  );
};

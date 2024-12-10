"use client";
import React, { useEffect, useState } from "react";
import { NavBar } from "./nav-bar";
import { FaStar } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Footer } from "./footer";
import Image from "next/image";
import { Check, ChevronsDown, Send } from "lucide-react";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import Link from "next/link";
import { Input } from "../ui/input";
import { IoMdSend } from "react-icons/io";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useUi from "@/lib/hooks/useUi";

export const LandingPage = () => {
  const { setOpenAuthModal } = useUi();
  const router = useRouter();
  const isLG = useMediaQuery("(min-width: 1024px)");
  const isBig = useMediaQuery("(min-width: 1537px)");

  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const data = [
    {
      count: "1000",
      name: "Algorithm ",
    },
    {
      count: "100",
      name: "Country Data",
    },
    {
      count: "50000",
      name: "Active Trader",
    },
  ];

  const suggestion = [
    "GP স্টক টি আগামীকাল কত টাকায় যাবে",
    "রবি স্টক টি কি কিনব",
    "রবি স্টক টি কি কিনব",
    "৫ টি সেরা স্টক এর নাম বল",
  ];

  const list = [
    {
      name: "99.99% accuracy Prediction ",
    },
    {
      name: "Clear Buy & Sell Recommendations",
    },
    {
      name: "Golden Stock Game Analysis",
    },
    {
      name: "Money & Risk Management",
    },
    {
      name: "Advanced AI Stock Screener",
    },
    {
      name: "Customizable Alerts System",
    },
    {
      name: "Real-Time Market Data & Charts",
    },
    {
      name: "Ai Real-Time Monitoring",
    },
    {
      name: "24/7 AI-Powered Support System",
    },
  ];

  const MobileSlider = () => {
    return (
      <div className="flex flex-row flex-nowrap items-center justify-start gap-5 overflow-x-auto bottom-[28vh] iSE:bottom-[24vh] i13Mini:bottom-[24vh] absolute z-10 md:hidden pl-5 scrollbar">
        {suggestion?.map((item: any, i: number) => {
          return (
            <button
              key={i}
              onClick={() => {
                setOpenAuthModal(true);
              }}
              className="cursor-pointer text-sm p-3 rounded-md border border-[#3BAFDA] inline-flex shrink-0 text-center bg-[#2B2B2B]">
              {item}
            </button>
          );
        })}
      </div>
    );
  };
  return (
    <div className="bg-gradient-to-l from-[#0A0A0A] to-[#0D0D0D] w-full min-h-screen overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-auto fixed bottom-0 z-20">
        <div
          // onClick={() => {
          //   window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          // }}
          className="text-center flex items-center justify-center flex-col gap-2">
          <p className="text-base lg:text-base">See more</p>
          <ChevronsDown className="w-5 h-5" />
        </div>
      </motion.div>
      <NavBar />
      <div className="relative">
        {/* linear */}
        <div className="absolute top-0 md:top-60 left-20 md:-left-20 w-full h-full pointer-events-none">
          <div className={cn("bg-linear-m md:bg-linear-pc z-20 scale-125")} />
        </div>

        <MobileSlider />
        <div className="flex xl:items-center justify-center w-full min-h-[calc(100vh-5rem)] max-h-calc(100vh-5rem)] md:min-h-screen md:max-h-screen md:h-screen mx-auto max-w-[1920px]">
          <div className="xl:px-3 mx-auto w-full lg:mt-5 xl:-mt-16">
            <div className="w-full h-full relative px-5">
              <div className="xl:hidden">
                <div className="hidden md:flex justify-end w-full px-4">
                  {/* iPad Rating */}
                  <div className="w-full relative aspect-[314/41] max-w-80 top-1">
                    <Image
                      src={"/apps-rating.svg"}
                      alt="rating"
                      fill
                      className="absolute object-contain w-full h-full"
                    />
                  </div>
                </div>

                <div className={cn("relative w-full")}>
                  <div className="md:hidden px-5 relative top-1">
                    <div className="w-full relative aspect-[314/41] max-w-80 mx-auto">
                      <Image
                        src={"/apps-rating.svg"}
                        alt="rating"
                        fill
                        className="absolute object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="block i14:hidden relative aspect-[289/414] md:hidden">
                    <Image
                      src={"/hero-320.svg"}
                      alt="bg"
                      fill
                      className="mx-auto shadow object-contain"
                    />
                  </div>

                  <div className="hidden i14:block md:hidden relative aspect-[365/637]">
                    <Image
                      src={"/hero-390.svg"}
                      alt="bg"
                      fill
                      className="mx-auto shadow object-contain"
                    />
                  </div>

                  {/* iPad Bg */}
                  <div className="hidden md:block relative aspect-[892/997]">
                    <Image
                      src={"/ipad-mini.svg"}
                      alt="bg"
                      fill
                      className="mx-auto shadow object-contain"
                    />
                  </div>

                  {/* iPad Text */}
                  <div className="hidden md:block absolute w-full h-full top-0 left-0">
                    <div
                      className={cn(
                        "relative z-50 flex flex-col w-full h-full mx-auto gap-16 top-36 max-w-screen-sm"
                      )}>
                      <h1
                        className={cn(
                          "font-bold text-center text-5xl !leading-[4rem] "
                        )}>
                        Instant Stock Predictions Enter a Company, Get{" "}
                        <span className="text-linear font-normal">
                          Buy/Sell
                        </span>{" "}
                        Signals.
                      </h1>
                      <div
                        className={cn(
                          "relative w-full max-w-lg mx-auto",
                          isBig && "max-w-2xl"
                        )}>
                        <div className="relative w-36 aspect-[169/40] ml-4">
                          <Image
                            src={"/accurate.svg"}
                            alt="accurate"
                            fill
                            className="absolute object-contain w-full h-full"
                          />
                        </div>
                        <div className="relative">
                          <Input
                            className="w-full h-12 xl:h-14 bg-[#1E1D1D] border border-[#3A3A3A] rounded-lg"
                            placeholder="Type a company name"
                          />
                          <div className="absolute right-5 top-0 h-full flex items-center justify-end">
                            <IoMdSend
                              onClick={() => {
                                router.push("/signin");
                              }}
                              className="relative z-50 text-2xl text-[#3BAFDA] cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row flex-nowrap items-center justify-center mt-10 gap-5 scrollbar">
                          {suggestion?.map((item: any, i: number) => {
                            return (
                              <Link
                                key={i}
                                href={"/signin"}
                                className="cursor-pointer text-sm p-3 rounded-md border border-[#3BAFDA] inline-flex shrink-0 text-center bg-[#2B2B2B]">
                                {item}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:hidden absolute w-full h-full pt-5 sm:p-8 top-0 left-0">
                    <div className="px-3">
                      <div className="relative z-10 top-10 sm:top-20 flex flex-col gap-10 sm:gap-20">
                        <h1 className="sm:px-8 leading-10 font-bold text-2xl text-center w-full md:max-w-md mx-auto">
                          Instant Stock Predictions Enter a Company, Get{" "}
                          <span className="text-linear font-normal">
                            Buy/Sell
                          </span>{" "}
                          Signals.
                        </h1>
                        <div className="relative w-full mx-auto">
                          <div className="relative w-36 aspect-[124/28] ml-3">
                            <Image
                              src={"/accurate-mb.svg"}
                              alt="accurate"
                              fill
                              className="absolute object-contain w-full h-full"
                            />
                          </div>
                          <Textarea
                            className="w-full bg-[#1E1D1D] border border-[#3A3A3A] rounded-lg z-10 relative max-h-20 resize-y pr-10"
                            placeholder="Type a company name"
                          />
                          <div className="absolute right-5 -top-4 h-full flex items-end justify-end">
                            <IoMdSend
                              onClick={() => {
                                router.push("/signin");
                              }}
                              className="text-2xl text-[#3BAFDA] z-10 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[1280/547.74] hidden xl:block">
                <div className="absolute right-10">
                  <div className="w-72 relative aspect-[314/41] lg:bottom-3 xl:bottom-2 2xl:bottom-0">
                    <Image
                      src={"/apps-rating.svg"}
                      alt="rating"
                      fill
                      className="absolute object-contain w-full h-full"
                    />
                  </div>
                </div>
                <Image
                  src={"/hero-pc.svg"}
                  alt="hero"
                  fill
                  className="absolute object-contain w-full h-full"
                />

                <div
                  className={cn(
                    "relative z-50",
                    isBig ? "top-36" : "lg:top-20 xl:top-24 "
                  )}>
                  <div
                    className={cn(
                      "flex flex-col w-full h-full mx-auto",
                      isBig
                        ? "gap-16 max-w-screen-md"
                        : "gap-5 lg:gap-8 xl:gap-12 max-w-screen-sm"
                    )}>
                    <h1
                      className={cn(
                        "leading-10 font-bold text-4xl text-center",
                        isBig
                          ? "text-5xl leading-[4rem] "
                          : "xl:leading-[3rem] "
                      )}>
                      Instant Stock Predictions Enter a Company, Get{" "}
                      <span className="text-linear font-normal">Buy/Sell</span>{" "}
                      Signals.
                    </h1>
                    <div
                      className={cn(
                        "relative w-full max-w-lg mx-auto",
                        isBig && "max-w-2xl"
                      )}>
                      <div className="relative w-36 aspect-[169/40] ml-4">
                        <Image
                          src={"/accurate.svg"}
                          alt="accurate"
                          fill
                          className="absolute object-contain w-full h-full"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          className="w-full h-12 xl:h-14 bg-[#1E1D1D] border border-[#3A3A3A] rounded-lg pr-14"
                          placeholder="Type a company name"
                        />
                        <div className="absolute right-5 top-0 h-full flex items-center justify-end">
                          <IoMdSend
                            onClick={() => {
                              router.push("/signin");
                            }}
                            className="relative z-50 text-2xl text-[#3BAFDA] cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row flex-nowrap items-center justify-center mt-10 gap-5 scrollbar">
                        {suggestion?.map((item: any, i: number) => {
                          return (
                            <Link
                              key={i}
                              href={"/signin"}
                              className="cursor-pointer text-sm p-3 rounded-md border border-[#3BAFDA] inline-flex shrink-0 text-center bg-[#2B2B2B]">
                              {item}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 lg:my-0 relative">
        <div className="h-full w-full absolute top-0 left-0 lg:py-10">
          <div className="h-full w-full bg-[#101519]"></div>
        </div>
        <div className="grid grid-cols-3 lg:gap-9 lg:p-3 relative container mx-auto w-full max-w-screen-xl">
          {data?.map((item: any, i: number) => {
            return (
              <div
                key={i}
                className="text-center space-y-3 bg-[#101519] py-3 lg:py-6 lg:rounded-xl">
                <h2 className="text-base lg:text-4xl font-bold">
                  {item?.count}+
                </h2>
                <p className="text-xs lg:text-xl font-normal">{item?.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <div className="px-3 lg:py-40 container mx-auto w-full max-w-screen-xl">
            <div className="flex flex-col gap-16 lg:gap-24">
              <h1 className="text-2xl lg:text-7xl font-bold max-w-72 lg:max-w-screen-md lg:mx-auto lg:leading-[5.5rem] mx-auto lg:text-center">
                Smarter, Faster, and
                <div className="bg-[#00729C] text-[#00FF85] rounded-full lg:rounded-3xl inline-flex text-base lg:text-4xl mt-2 py-0 px-3 lg:px-6 lg:py-4 font-light lg:font-normal lg:-translate-y-3 leading-10">
                  Profitable
                </div>{" "}
                Market Moves!
              </h1>
              <div className="flex flex-col lg:flex-row justify-between lg:gap-16">
                <div className="lg:w-1/2">
                  <div className="max-w-xl mx-auto lg:ml-0 flex flex-col gap-3 bg-[#0F1012] border border-[#202020] rounded-3xl py-6 px-3 relative">
                    <Image
                      src={"/magic.svg"}
                      alt="check"
                      width={34}
                      height={34}
                      className="hidden lg:block absolute right-2 top-2 aspect-[34/34] object-contain"
                    />
                    {list?.map((item: any, i: number) => {
                      return (
                        <div key={i} className="flex items-center">
                          <div className="w-10 h-10 rounded-full relative">
                            <Image
                              src={"/check.svg"}
                              alt="check"
                              fill
                              className="absolute object-contain w-full h-full"
                            />
                          </div>
                          <div className="relative ">
                            <p className="text-gradient text-xs sm:text-xl py-2 px-3 border rounded-full">
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {isLG && (
                  <div className="relative w-full lg:w-1/2 aspect-[585/498]">
                    <Image
                      src={"/graph-summary.svg"}
                      alt="graph"
                      fill
                      className="absolute object-contain w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-20 left-0 w-full">
              <div className="relative w-full aspect-[1512/840]">
                <Image
                  src={"/market.svg"}
                  alt="bg"
                  fill
                  className="absolute object-cover w-full h-full bottom-0"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-20 absolute bg-[#020007]/30 z-20 bottom-0 shadow-xl"></div>
        </div>

        {!isLG && (
          <div className="relative w-full aspect-[320/362] mt-6 mb-6">
            <Image
              src={"/graph-summary-mb.svg"}
              alt="graph"
              fill
              className="absolute object-contain w-full h-full"
            />
          </div>
        )}

        <div
          className={cn(
            "absolute flex-grow-0 w-[772px] h-[689px] lg:w-[1510px] lg:h-[1140px] bg-[#464DF8] lg:bg-transparent bg-gradient-to-b from-[#464DF8] to-[#464DF8)] opacity-35 blur-[500px] rounded-[1000px] bottom-10 lg:-bottom-[10%] left-1/2 lg:left-auto lg:-right-[10%] z-10 scale-125 pointer-events-none"
          )}
        />

        <div
          id="apps"
          className="relative -scroll-mt-16 bg-[#000] px-3 pt-8 pb-10 lg:py-40 flex flex-col gap-10">
          <h1 className="text-xl md:text-3xl font-bold max-w-60 md:max-w-96 md:leading-10 mx-auto text-center lg:hidden z-10">
            Stay ahead with real-time updates{" "}
            <span className="text-[#6B70FF]">download our app now!</span>
          </h1>
          <Image
            src={"/app-store-pc-bg.svg"}
            alt="bg"
            fill
            className="absolute object-cover w-full h-full"
          />
          <div className="px-5 grid lg:grid-cols-2 lg:gap-16 container mx-auto w-full max-w-screen-xl relative">
            {/* <Image
              src={"/app-store-pc-bg.svg"}
              alt="bg"
              fill
              className="absolute object-cover w-full h-full"
            /> */}
            <div className="relative w-full aspect-[266.74/240.26] max-w-xl lg:max-w-none mx-auto lg:ml-0">
              <Image
                src={"/mobile-app.svg"}
                alt="app"
                fill
                className="absolute object-contain w-full h-full"
              />
            </div>
            <div className="hidden lg:flex flex-col gap-10 relative">
              <h2 className="text-[3.13rem] font-bold max-w-xl">
                Stay ahead with real-time updates{" "}
                <span className="text-[#6B70FF]">download our app now!</span>
              </h2>
              <div className="w-full flex items-center gap-4">
                <Link
                  href={"https://apps.apple.com/us/app/duty-ai/id6476618432"}>
                  <div className="relative w-48 aspect-[191.75/51.39]">
                    <Image
                      src={"/apple-app.svg"}
                      alt="app"
                      fill
                      className="absolute object-contain w-full"
                    />
                  </div>
                </Link>
                <Link
                  href={
                    "https://play.google.com/store/apps/details?id=com.easinarafat.dutyai&hl=en&pli=1"
                  }>
                  <div className="relative w-48 aspect-[188.93/51.39]">
                    <Image
                      src={"/google-app.svg"}
                      alt="app"
                      fill
                      className="absolute object-contain w-full"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 lg:hidden max-w-xl lg:max-w-none mx-auto lg:ml-0">
            <Link
              target="_blank"
              href={"https://apps.apple.com/us/app/duty-ai/id6476618432"}>
              <div className="relative w-full aspect-[138.06/37]">
                <Image
                  src={"/apple-app.svg"}
                  alt="app"
                  fill
                  className="absolute object-contain w-full"
                />
              </div>
            </Link>
            <Link
              target="_blank"
              href={
                "https://play.google.com/store/apps/details?id=com.easinarafat.dutyai&hl=en&pli=1"
              }>
              <div className="relative w-full aspect-[136.03/37]">
                <Image
                  src={"/google-app.svg"}
                  alt="app"
                  fill
                  className="absolute object-contain w-full"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-3 mb-5 mt-10 lg:py-40 container mx-auto w-full max-w-xl lg:max-w-screen-xl">
        <div className="lg:hidden">
          <div className="relative w-full aspect-[289/207]">
            <Image
              src={"/cta-bg.svg"}
              alt="cta"
              fill
              className="absolute object-contain w-full h-full"
            />
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="relative flex flex-col gap-3 items-center">
                <h1 className="text-xs md:text-base font-bold text-center px-5 md:px-10">
                  Stay up to date with the latest stock market insights{" "}
                  <span className="text-[#1B85FF]">join us today!</span>
                </h1>
                <p className="text-xs md:text-sm text-[#A0A0A0] px-5 md:px-14 text-center">
                  Stay Up To Date With Us The Latest Stock Market Update Stay Up
                  To Date With Us The Latest Stock Market Update
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <Link
                    target="_blank"
                    href={"https://www.facebook.com/dutyai.duty/"}>
                    <div className="relative w-10 aspect-[48/48]">
                      <Image
                        src={"/cta-facebook.svg"}
                        alt="facebook"
                        fill
                        className="absolute object-contain w-full h-full"
                      />
                    </div>
                  </Link>
                  <Link
                    target="_blank"
                    href={"https://www.facebook.com/share/g/zFRzbYwCWMAnnFsQ/"}>
                    <div className="relative w-36 aspect-[179/48]">
                      <Image
                        src={"/cta-connect.svg"}
                        alt="group"
                        fill
                        className="absolute object-contain w-full h-full"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex relative aspect-[1305.67/405]">
          <Image
            src={"/cta-bg-pc.svg"}
            alt="cta"
            fill
            className="absolute object-contain w-full h-full"
          />
          <div className="absolute w-full h-full left-0 top-0 p-5 xl:p-10">
            <div className="relative flex flex-col justify-center items-center gap-5 xl:gap-8 w-full lg:scale-90 xl:scale-100">
              <h1 className="font-black text-[2.5rem] text-center leading-[4rem] max-w-screen-md">
                Stay up to date with the latest stock market insights{" "}
                <span className="text-[#1B85FF]">join us today!</span>
              </h1>
              <p className="text-muted-foreground text-base max-w-screen-md text-center">
                Join our Facebook group for real-time app updates, exclusive
                insights, support, and the latest info!
              </p>
              <div className="flex items-center">
                <Link
                  target="_blank"
                  href={"https://www.facebook.com/dutyai.duty/"}>
                  <div className="relative w-14 aspect-[48/48]">
                    <Image
                      src={"/cta-facebook.svg"}
                      alt="facebook"
                      fill
                      className="absolute object-contain w-full h-full"
                    />
                  </div>
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.facebook.com/share/g/zFRzbYwCWMAnnFsQ/"}>
                  <div className="relative w-48 aspect-[179/48]">
                    <Image
                      src={"/cta-connect.svg"}
                      alt="group"
                      fill
                      className="absolute object-contain w-full h-full"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

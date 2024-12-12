import useUi from "@/lib/hooks/useUi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { setOpenAuthModal } = useUi();
  const Logo = (className: any) => {
    return (
      <div className="w-24 lg:w-40 aspect-[76.57/22.57] lg:aspect-[202/60] relative mx-auto lg:mx-0">
        <Image
          src={"/duty-ai.svg"}
          alt="logo"
          fill
          className="object-contain absolute w-full h-full pointer-events-none"
        />
      </div>
    );
  };

  return (
    <div className="pb-5">
      <div className="py-5 relative z-50">
        <div className="flex flex-col lg:hidden gap-3">
          <div className="mb-2">
            <Logo />
          </div>
          <div className="flex justify-center text-sm font-normal relative z-10">
            <button
              onClick={() => setOpenAuthModal(true)}
              className="relative z-30 text-gradient cursor-pointer px-2">
              Login
            </button>

            <Link href="/about">
              <p className="text-gradient cursor-pointer px-2">About Us</p>
            </Link>
            <Link href="/legal/terms-and-conditions">
              <p className="text-gradient cursor-pointer px-2">Privacy</p>
            </Link>
            <Link href="/legal/privacy-policy">
              <p className="text-gradient cursor-pointer px-2">Term</p>
            </Link>
          </div>
          <div className="text-gradient text-base text-center mt-3">
            All Right Reserved Duty {currentYear}
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-3 gap-2 mx-auto max-w-screen-xl">
          <div className="flex justify-start">
            <Logo />
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gradient text-base lg:text-xl text-center">
              All Right Reserved Duty {currentYear}
            </p>
          </div>
          <div className="flex justify-end">
            <div className="flex justify-center items-center text-sm font-normal relative z-10">
              <button
                onClick={() => setOpenAuthModal(true)}
                className="relative z-30 text-gradient cursor-pointer px-2">
                Login
              </button>

              <Link href="/about">
                <p className="text-gradient cursor-pointer px-2">About Us</p>
              </Link>
              <Link href="/legal/terms-and-conditions">
                <p className="text-gradient cursor-pointer px-2">Privacy</p>
              </Link>
              <Link href="/legal/privacy-policy">
                <p className="text-gradient cursor-pointer px-2">Term</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const Logo = (className: any) => {
    return (
      <div className="w-20 h-16 lg:w-40 relative mx-auto">
        <Image
          src={"/duty-ai.svg"}
          alt="logo"
          fill
          className="object-contain absolute w-full h-full"
        />
      </div>
    );
  };

  const Links = () => {
    return (
      <div className="flex justify-center gap-3 lg:gap-5 text-sm font-normal">
        <Link href="signin" className="text-gradient">
          Login
        </Link>
        <Link href="/about" className="text-gradient">
          About Us
        </Link>
        <Link href="/legal/terms-and-conditions" className="text-gradient">
          Privacy
        </Link>
        <Link href="/legal/privacy-policy" className="text-gradient">
          Term
        </Link>
      </div>
    );
  };

  return (
    <div className="">
      <div className="container mx-auto max-w-screen-xl">
        <footer className="flex flex-col lg:hidden gap-3 pb-5">
          <div className="">
            <Logo />
          </div>
          <Links />
          <div className="text-gradient text-base text-center mt-3">
            All Right Reserved Duty {currentYear}
          </div>
        </footer>
        <footer className="hidden lg:flex flex-row justify-between items-center gap-3 pb-5">
          <div className="">
            <Logo />
          </div>
          <div className="text-gradient text-base lg:text-xl text-center">
            All Right Reserved Duty {currentYear}
          </div>
          <Links />
        </footer>
      </div>
    </div>
  );
};

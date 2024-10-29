import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LOGO } from "../icons/LOGO";

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-2 lg:py-0 px-3 lg:bg-[#1F1F1F] lg:border-b border-[#3A3A3A] lg:sticky lg:top-0">
      <div className="">
        <div className="w-28 h-16 relative">
          <Image
            src={"/duty-ai.svg"}
            alt="logo"
            fill
            className="object-contain absolute w-full h-full"
          />

          {/* <LOGO className="w-full h-full text-white" /> */}
        </div>
      </div>
      <div className="flex items-center bg-[#262B32] rounded-full">
        <Link href={"/signin"}>
          <Button className="text-white bg-[#3BAFDA] hover:bg-[#3BAFDA] rounded-full">
            Login
          </Button>
        </Link>
        <Link href={"/#apps"} className="hidden lg:block">
          <Button
            variant={"link"}
            className="text-white hover:no-underline rounded-full">
            Download apps
          </Button>
        </Link>
      </div>
    </div>
  );
};

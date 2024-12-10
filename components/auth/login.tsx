import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { IoMdMail } from "react-icons/io";
import useUi from "@/lib/hooks/useUi";
import { GoogleBtn } from "./google-btn";
import { AppleBtn } from "./apple-btn";
import Link from "next/link";

export const btnStyle = `w-full h-10 xl:h-12 text-xs lg:text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-white font-normal`;

export const Login = () => {
  const { setStepper } = useUi();
  return (
    <div className="mx-4 sm:mx-6 md:mx-14 lg:mx-6 xl:mx-14">
      <div className="flex flex-col gap-4 px-5 lg:px-0 pt-5 lg:pt-8">
        <h1 className="text-2xl xl:text-3xl text-white font-bold text-center mb-2">
          Login
        </h1>

        <Button
          onClick={() => {
            setStepper("login-form");
          }}
          style={{
            background:
              "linear-gradient(279.01deg, #F39C12 36.31%, #F05A28 63.69%)",
          }}
          className={btnStyle}>
          <IoMdMail className="mr-2 w-6 h-6" />
          Login with email
        </Button>

        <GoogleBtn />
        <AppleBtn />

        <div className="flex items-center justify-center">
          <p className="text-xs lg:text-sm 3xl:text-base text-center">
            Don’t have an account?
          </p>
          &nbsp;
          <p
            onClick={() => {
              setStepper("signup-form");
            }}
            className="cursor-pointer text-[#1FFF7E] text-xs lg:text-sm 3xl:text-base text-center">
            Sign up
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-16 2xl:pt-24 pb-5 xl:pb-6">
        <div className="flex items-center justify-center gap-1">
          <Link
            href={"/legal/terms-and-conditions"}
            className="text-xs lg:text-sm 3xl:text-base text-center">
            Term and condition
          </Link>
          <span className="text-sm text-center">|</span>
          <Link
            href={"/legal/privacy-policy"}
            className="text-xs lg:text-sm 3xl:text-base text-center">
            Privacy policies
          </Link>
        </div>
        <p className="text-xs lg:text-sm 3xl:text-base text-center">
          Contact us
        </p>
      </div>
    </div>
  );
};

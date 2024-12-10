"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../global/FormInput";
import { ChevronRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import useUi from "@/lib/hooks/useUi";
import { AppleBtn } from "./apple-btn";
import { GoogleBtn } from "./google-btn";
import Link from "next/link";
import { submitBtn } from "./login-form";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const schema = z
  .object({
    otp: z
      .string()
      .min(6, {
        message: "OTP must be 6 digits",
      })
      .regex(/^\d{6}$/, { message: "OTP must be 6 digits" }),
    password: z
      .string()
      .min(8, { message: "Password must be between 8 and 20 characters long." })
      .max(20, {
        message: "Password must be between 8 and 20 characters long.",
      })
      .refine(
        (value) =>
          /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value),
        {
          message:
            "Password can only contain letters, numbers, and special characters.",
        }
      ),
    retypePassword: z.string({ message: "Passwords do not match." }),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match.",
    path: ["retypePassword"], // Focus the error on retypePassword
  });

export const ChangePassword = () => {
  const { setStepper, otpMail, setOpenAuthModal } = useUi();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [invalidCode, setInvalidCode] = useState(null);
  const _3M = 179;
  const [timeLeft, setTimeLeft] = useState(_3M);
  const [isCounting, setIsCounting] = useState(false);
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
      password: "",
      retypePassword: "",
    },
  });

  const values = form.watch();
  const isFormValid = Object.values(values).every((val) => val.trim() !== "");

  useEffect(() => {
    let timer: any;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartCount = async () => {
    try {
      if (!isLoaded) {
        return;
      }
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: otpMail,
      });
      setTimeLeft(_3M); // Reset to 3 minutes
      setIsCounting(true);
      toast({
        title: "OTP sent successfully",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      toast({
        title: err.errors[0]?.message || "Failed to send OTP",
      });
    }
  };

  const onSubmit = async (data: any) => {
    if (!isLoaded) {
      return;
    }
    try {
      setIsLoading(true);
      const completeSignIn = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.otp,
        password: data.password,
      });

      if (completeSignIn?.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        setOpenAuthModal(false);
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setInvalidCode(err.errors[0]?.longMessage || "Invalid OTP");
      // Toast.show({
      //   type: "error",
      //   text1: err.errors[0]?.longMessage || "Invalid OTP",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 px-5 lg:px-0 pt-8 pb-8 max-h-[30rem] 3xl:max-h-none mx-4 sm:mx-6 md:mx-14 lg:mx-6 xl:mx-14">
      <h1 className="text-xl xl:text-3xl 3xl:text-4xl text-white font-bold mb-2 mt-6">
        Change Password
      </h1>
      <p className="text-[#ECECEC] text-xs 2xl:text-sm">
        A verification code has been sent to <br />
        {otpMail}. Check your spam if you don't see it. <br />
        Please create a strong password (8-20 characters).
      </p>
      <div className="mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 3xl:gap-5">
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name="otp"
                  label="Verification code"
                  placeholder="Enter the code"
                />
                {invalidCode && (
                  <p className="text-destructive text-sm">{invalidCode}</p>
                )}
                {isCounting ? (
                  <p className="text-white text-sm">
                    Wait {formatTime(timeLeft)} before requesting another code
                  </p>
                ) : (
                  <p className="text-white text-sm">
                    Did not receive it yet?{" "}
                    <button
                      type="button"
                      onClick={handleStartCount}
                      className="text-destructive">
                      Send again.
                    </button>
                  </p>
                )}
              </div>
              <FormInput
                control={form.control}
                label="Password"
                name={"password"}
                placeholder={"Type Password"}
                type={showPass ? "text" : "password"}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="relative cursor-pointer">
                    {!showPass ? (
                      <Eye className="w-4 xl:w-5 h-4 xl:h-5" />
                    ) : (
                      <EyeOff className="w-4 xl:w-5 h-4 xl:h-5" />
                    )}
                  </button>
                }
              />

              <FormInput
                control={form.control}
                label="Retype Password"
                type={showRePass ? "text" : "password"}
                name={"retypePassword"}
                placeholder={"Retype Password"}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowRePass(!showRePass)}
                    className="relative cursor-pointer">
                    {!showRePass ? (
                      <Eye className="w-4 xl:w-5 h-4 xl:h-5" />
                    ) : (
                      <EyeOff className="w-4 xl:w-5 h-4 xl:h-5" />
                    )}
                  </button>
                }
              />
            </div>
            <div className="pb-8 3xl:pb-0">
              <Button
                type="submit"
                disabled={!isFormValid || form.formState.isSubmitting}
                className={submitBtn}>
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Confirm and login"
                )}{" "}
                <ChevronRight className="w-5 h-5 absolute right-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

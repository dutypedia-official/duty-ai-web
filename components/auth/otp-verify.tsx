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
import { ChevronRight, Eye, LoaderCircle } from "lucide-react";
import useUi from "@/lib/hooks/useUi";
import { AppleBtn } from "./apple-btn";
import { GoogleBtn } from "./google-btn";
import Link from "next/link";
import { submitBtn } from "./login-form";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const schema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP must be 6 digits",
    })
    .regex(/^\d{6}$/, { message: "OTP must be 6 digits" }),
});

export const OtpVerify = () => {
  const { setStepper, otpMail, setOpenAuthModal } = useUi();
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCode, setInvalidCode] = useState(null);
  const _3M = 179;
  const [timeLeft, setTimeLeft] = useState(_3M);
  const [isCounting, setIsCounting] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  const values = form.watch();
  const isFormValid = Object.values(values).every((val) => val.trim() !== "");

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    if (data) {
      if (!isLoaded) {
        return;
      }

      try {
        setIsLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: data.otp,
        });

        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          setOpenAuthModal(false);
          router.push("/");
        } else {
          console.error(JSON.stringify(completeSignUp, null, 2));
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
    }
  };

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
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setTimeLeft(_3M); // Reset to 3 minutes
      setIsCounting(true);
      toast({ title: "OTP sent successfully" });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      toast({ title: err.errors[0]?.message || "Failed to send OTP" });
    }
  };
  return (
    <div className="flex flex-col gap-2 px-5 lg:px-0 pt-4 lg:pt-6 pb-12 mx-4 sm:mx-6 md:mx-14 lg:mx-6 xl:mx-14">
      <h1 className="text-xl xl:text-3xl 3xl:text-4xl text-white font-bold mb-2 mt-6">
        Verify your email
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
            </div>
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
          </form>
        </Form>
      </div>
    </div>
  );
};

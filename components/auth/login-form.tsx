"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import useUi from "@/lib/hooks/useUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../global/FormInput";
import { AppleBtn } from "./apple-btn";
import { GoogleBtn } from "./google-btn";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string({ message: "Invalid password" })
    .min(8, { message: "Password must be between 8 and 20 characters long." })
    .max(20, {
      message: "Password must be between 8 and 20 characters long.",
    }),
});

export const submitBtn =
  "flex items-center justify-center bg-[linear-gradient(135deg,#8E44AD,#4E73DF)] text-white h-10 xl:h-12 px-4 rounded-xl text-sm font-semibold relative w-full disabled:bg-[linear-gradient(#4F5A5F,#3A3D3F)] filter drop-shadow-lg";

export const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const { setStepper, setOpenAuthModal } = useUi();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    if (data) {
      if (!isLoaded) return;

      try {
        setIsLoading(true);
        const completeSignIn = await signIn.create({
          identifier: values.email,
          password: values.password,
        });
        await setActive({ session: completeSignIn.createdSessionId });
        toast({ title: "Logged in successfully!" });
        setOpenAuthModal(false);
        router.replace("/");
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
        toast({ title: "Invalid email or password" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const values = form.watch();
  const isFormValid = Object.values(values).every((val) => val.trim() !== "");
  return (
    <div className="flex flex-col gap-4 px-5 lg:px-0 pt-4 lg:pt-6 pb-6  mx-4 sm:mx-6 md:mx-14 lg:mx-6 xl:mx-14">
      <h1 className="text-2xl xl:text-3xl text-white font-bold text-center mb-2">
        Login
      </h1>

      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 3xl:gap-5">
              <FormInput
                control={form.control}
                name={"email"}
                placeholder={"Email"}
              />
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name={"password"}
                  placeholder={"Password"}
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
                <p
                  onClick={() => {
                    setStepper("forgot-form");
                  }}
                  className="text-white text-xs lg:text-sm 3xl:text-base text-end cursor-pointer">
                  Forgot Password?
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || form.formState.isSubmitting}
              className={submitBtn}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Next"}{" "}
              <ChevronRight className="w-5 h-5 absolute right-4" />
            </Button>
          </form>
        </Form>
        <div className="hidden 3xl:block">
          <div className="flex justify-between 2xl:py-10">
            <p className="text-sm text-muted-foreground line-clamp-1">
              ...........................................................................................................
            </p>
            <p className="text-sm text-muted-foreground px-2 mt-[3px]">or</p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              ...........................................................................................................
            </p>
          </div>
          <div className="">
            <div className="flex flex-col gap-6">
              <GoogleBtn />
              <AppleBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="flex 3xl:hidden items-center justify-center mt-10 3xl:mb-10">
        <p className="text-white text-xs lg:text-sm 3xl:text-base text-center">
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
      <div className="hidden 3xl:flex flex-col gap-6 pt-16 2xl:pt-24 pb-5 xl:pb-6">
        <div className="flex items-center justify-center gap-1">
          <Link
            href={"/legal/terms-and-conditions"}
            className="text-xs lg:text-sm 3xl:text-base text-center">
            Term and condition
          </Link>
          <span className="text-xs lg:text-sm 3xl:text-base text-center">
            |
          </span>
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

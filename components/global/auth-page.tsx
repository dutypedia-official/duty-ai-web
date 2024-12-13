"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import useUi from "@/lib/hooks/useUi";
import { X } from "lucide-react";
import Image from "next/image";
import { MdOutlineArrowBack } from "react-icons/md";
import { ForgotForm } from "../auth/forgot-form";
import { Login } from "../auth/login";
import { LoginForm } from "../auth/login-form";
import { ChangePassword } from "../auth/change-password";
import { SignupForm } from "../auth/signup-form";
import BarlineChart from "../icons/BarlineChart";
import { OtpVerify } from "../auth/otp-verify";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthPage() {
  const { stepper, setStepper, openAuthModal, setOpenAuthModal, setOtpMail } =
    useUi();
  const router = useRouter();
  const pathname = usePathname();

  const backFn = () => {
    if (stepper === "login-form") {
      setStepper("login");
    }
    if (stepper === "forgot-form") {
      setStepper("login-form");
    }
    if (stepper === "change-password") {
      setStepper("forgot-form");
    }
    if (stepper === "signup-form") {
      setStepper("login");
    }
  };

  useEffect(() => {
    setOpenAuthModal(false);
  }, [router, pathname]);

  useEffect(() => {
    if (openAuthModal === false) {
      setStepper("login");
      setOtpMail("");
    }
  }, [openAuthModal]);

  return (
    // <Sheet open={openAuthModal} onOpenChange={setOpenAuthModal}>
    <Sheet open={openAuthModal} onOpenChange={setOpenAuthModal}>
      <SheetContent className="w-screen h-screen max-w-none min-w-full p-0 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0  flex flex-col items-center justify-center">
        <SheetTitle className="hidden" />
        <SheetDescription className="hidden" />

        <Image
          src={"/auth-bg.svg"}
          alt="duty-ai"
          width={1920}
          height={1080}
          className="w-full h-full object-cover absolute"
        />
        {/* main card */}
        <div className="w-full h-full lg:max-w-[1756px] lg:max-h-[1129px] flex flex-col items-center justify-center md:px-10 md:py-14 lg:py-8">
          <div className="mx-auto w-full h-full relative sm:rounded-3xl">
            <div className="w-full min-h-full max-h-full sm:rounded-3xl relative grid lg:grid-cols-2">
              <X
                onClick={() => setOpenAuthModal(false)}
                className="w-6 h-6 cursor-pointer absolute right-4 top-4 z-50"
              />

              <div className="gradient-border-mask relative hidden lg:block overflow-hidden">
                <div className="relative w-full h-full bg-transparent rounded-3xl">
                  <Image
                    src={"/auth-left.svg"}
                    alt="duty-ai"
                    fill
                    className="object-cover w-full h-full rounded-l-lg"
                  />
                  <div className="absolute z-50 w-full bottom-2 flex flex-col gap-7 justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <h2
                        className="text-center text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text"
                        style={{
                          background:
                            "linear-gradient(335.27deg, #F0F3FA, #7935DD, #F0F3FA)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}>
                        Let,s drive the
                        <br />
                        market with AI
                      </h2>
                    </div>
                    <Image
                      src={"/duty-ai.svg"}
                      alt="duty-ai"
                      width={200}
                      height={100}
                      className="object-contain w-40 z-50"
                    />
                  </div>

                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-60 w-full bg-black/40 blur-[20px] rounded-b-[12.8px] z-10" />

                  <div className="w-[80%] aspect-square rounded-full bg-[#E62EE9]/50  absolute -bottom-[40%] left-1/2 -translate-x-1/2 filter blur-[133.333px]"></div>
                </div>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(244.53deg, #827293 74.73%, #8B7B9D 96.47%)",
                }}
                className="md:rounded-3xl lg:rounded-l-none md:rounded-r-3xl relative flex items-center justify-center">
                <div className="absolute bottom-0 left-0 w-full h-full">
                  <BarlineChart className="w-full h-auto absolute bottom-0" />
                </div>
                {/* forms */}
                <div className="w-full h-full relative flex flex-col items-center justify-between px-6 sm:px-16 xl:px-20 md:pb-10 lg:pb-5">
                  <div className="max-w-[506px] w-full mb-2">
                    {stepper !== "login" && (
                      <button
                        onClick={backFn}
                        className="cursor-pointer flex items-center mt-5">
                        <MdOutlineArrowBack className="mr-2 text-xl" /> Back
                      </button>
                    )}
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(220.23deg, rgba(108, 91, 123, 0.44) 3.54%, rgba(74, 60, 84, 0.44) 96.46%)",
                    }}
                    className="flex justify-between rounded-xl flex-col gap-5 backdrop-blur-[2px] border border-[#FFFFFF]/40 shadow-sm w-full mx-4 sm:mx-6 md:mx-14 lg:mx-6 xl:mx-14 max-w-[506px] overflow-y-auto">
                    {stepper === "login" && <Login />}
                    {stepper === "login-form" && <LoginForm />}
                    {stepper === "signup-form" && <SignupForm />}
                    {stepper === "forgot-form" && <ForgotForm />}
                    {stepper === "otp-verify" && <OtpVerify />}
                    {stepper === "change-password" && <ChangePassword />}
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

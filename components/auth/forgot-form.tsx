"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";

import useUi from "@/lib/hooks/useUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../global/FormInput";
import { submitBtn } from "./login-form";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "../ui/use-toast";

const schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
export const ForgotForm = () => {
  const { setStepper, setOtpMail } = useUi();
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    if (data) {
      if (!isLoaded) return;

      try {
        setIsLoading(true);
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        });
        toast({ title: "A password reset link has been sent to your email." });
        setOtpMail(data.email);
        setStepper("change-password");
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
        toast({ title: err.errors[0]?.longMessage || "Failed to send OTP" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const values = form.watch();
  const isFormValid = Object.values(values).every((val) => val.trim() !== "");
  return (
    <div className="flex flex-col gap-2 px-5 lg:px-0 pt-4 lg:pt-6 pb-12 mx-4 sm:mx-6 md:mx-14 lg:mx-6 xl:mx-14">
      <h1 className="text-xl xl:text-3xl 3xl:text-4xl text-white font-bold mb-2 mt-6">
        Enter your email <br />
        address
      </h1>
      <p className="text-[#ECECEC] text-xs 2xl:text-sm">
        Your privacy is important to us. Rest assured, your email address will
        only be used for verification purposes.
      </p>
      <div className="mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 3xl:gap-5">
              <div className="">
                <FormInput
                  control={form.control}
                  name={"email"}
                  placeholder={"Type Email"}
                />
                {wrongEmail && (
                  <p className="text-destructive text-sm">
                    Email does not exist.
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" disabled={!isFormValid} className={submitBtn}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Next"}{" "}
              <ChevronRight className="w-5 h-5 absolute right-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

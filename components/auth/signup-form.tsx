"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

import useUi from "@/lib/hooks/useUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../global/FormInput";
import { submitBtn } from "./login-form";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

const schema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
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

export const SignupForm = () => {
  const { setStepper, setOtpMail } = useUi();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [nameError, setNameError] = useState<any>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      retypePassword: "",
    },
  });

  useEffect(() => {
    if (name === "") {
      setNameError(null); // Do not show an error for an empty initial state
      return;
    }

    const specialCharacters = [
      "!",
      '"',
      "#",
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "?",
      "@",
      "[",
      "\\",
      "]",
      "^",
      "_",
      "`",
      "{",
      "|",
      "}",
      "~",
      `“`,
      "'",
    ];

    const containsSpecialCharacter = specialCharacters.some((char) =>
      name.includes(char)
    );

    if (containsSpecialCharacter) {
      setNameError("Use only letters and numbers.");
    } else if (name.length < 4) {
      setNameError("Min 4 max 20 characters also");
    } else if (name.length > 20) {
      setNameError("Min 4 max 20 characters also");
    } else {
      setNameError(null);
    }
  }, [name]);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setNameError(null);
  };

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    if (data && nameError === null) {
      if (!isLoaded) {
        return;
      }

      try {
        setIsLoading(true);
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
          firstName: name,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setOtpMail(data.email);
        setStepper("otp-verify");
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
        toast({
          title: err.errors[0].message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const values = form.watch();
  const isFormValid = Object.values(values).every((val) => val.trim() !== "");
  return (
    <div className="flex flex-col gap-2 px-5 lg:px-0 pt-8 pb-8 max-h-[30rem] 3xl:max-h-none mx-4 sm:mx-6 md:mx-14 lg:mx-6 xl:mx-14">
      <h1 className="text-2xl xl:text-3xl text-white font-bold mb-2">
        Name & Password
      </h1>
      <p className="text-[#ECECEC] text-xs xl:text-sm">
        Use alphabetic characters only. Name should be
        <span className="block font-bold">4-20 characters.</span> Please create
        a strong password between{" "}
        <span className="font-bold">8 and 20 characters</span> to ensure the
        security of your account.
      </p>
      <div className="mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 3xl:gap-5">
              <FormInput
                control={form.control}
                label="Email"
                name={"email"}
                placeholder={"Type Email"}
              />

              <div className="space-y-1">
                <Label className="text-xs xl:text-sm">Your Name</Label>
                <div>
                  <div className="relative h-10 xl:h-12">
                    <Input
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder={"Name"}
                      className={cn(
                        "h-full text-white bg-[#333333] border-[#4F5A5F] focus:border-[#4E73DF] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl text-xs",
                        nameError &&
                          "border-destructive focus:border-destructive"
                      )}
                    />
                  </div>
                </div>
                {nameError && (
                  <p className="text-destructive text-sm">{nameError}</p>
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
                {isLoading ? <LoaderCircle className="animate-spin" /> : "Next"}{" "}
                <ChevronRight className="w-5 h-5 absolute right-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

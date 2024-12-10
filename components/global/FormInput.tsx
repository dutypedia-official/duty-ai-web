"use client";
import React, { useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export const FormInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  icon,
}: any) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1">
          {label && (
            <FormLabel className="text-xs xl:text-sm">{label}</FormLabel>
          )}
          <FormControl>
            <div className="relative h-10 xl:h-12">
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                className={cn(
                  "h-full text-white bg-[#333333] border-[#4F5A5F] focus:border-[#4E73DF] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl text-xs",
                  fieldState.error &&
                    "border-destructive focus:border-destructive",
                  icon && "pr-11"
                )}
              />
              {icon && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-20 cursor-pointer">
                  {icon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

"use client";

import { ThemeProvider } from "next-themes";
import { type FC, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import AuthPage from "@/components/global/auth-page";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <AuthPage />
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;

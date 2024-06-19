import IconBar from "@/components/dashboard/iconBar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="flex bg-slate-50 relative">
        <IconBar />
        {children}
      </div>
    </div>
  );
}

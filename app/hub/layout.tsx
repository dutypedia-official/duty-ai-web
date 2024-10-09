import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import SidebarItems from "./_components/sidebar-items";
import ProfileMenu from "@/components/global/profileMenu";
import { ModeToggle } from "@/components/modeToggle";
import Providers from "@/components/provider";

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const headersList = headers();

  return (
    <Providers>
      <div className="grid grid-cols-1 min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-background md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
            <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className=" line-clamp-1">Duty AI</span>
              </Link>
            </div>
            <div className="flex-1">
              <SidebarItems />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[calc(100vw-220px)] lg:w-[calc(100vw-280px)]">
          <header className="flex z-50 sticky top-0 h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-md backdrop-saturate-200 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SidebarItems />
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1"></div>
            <ModeToggle />
            <ProfileMenu />
          </header>
          <main className="flex flex-1 w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}

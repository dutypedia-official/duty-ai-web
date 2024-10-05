"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Bell,
  CircleUser,
  CreditCard,
  DollarSign,
  Gem,
  Home,
  LineChart,
  Menu,
  MessageCircleMoreIcon,
  Package,
  Package2,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Users,
  UsersRound,
  WalletCards,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

const appLinks = [
  {
    category: "Admin",
    links: [
      {
        title: "Notifications",
        href: "/hub",
        icon: Bell,
        notificationCount: 0,
        dropdown: [],
      },
      {
        title: "Active Users",
        href: "/hub/active",
        icon: UsersRound,
        notificationCount: 0,
        dropdown: [],
      },

      {
        title: "Conversations",
        href: "/hub/conversations",
        icon: WalletCards,
        notificationCount: 0,
        dropdown: [],
      },
      {
        title: "Messages",
        href: "/hub/messages",
        icon: MessageCircleMoreIcon,
        notificationCount: 0,
        dropdown: [],
      },
    ],
  },
  {
    category: "Settings",
    links: [
      {
        title: "Billing",
        href: "/hub/billing",
        icon: CreditCard,
        notificationCount: 0,
        dropdown: [],
      },
    ],
  },
];

const SidebarItems = () => {
  const pathname = usePathname();
  const [aValue, setAValue] = useState("");

  useEffect(() => {
    if (pathname?.includes("/application/invoices")) {
      setAValue("invoices");
    } else {
      setAValue("");
    }
  }, [pathname]);

  return (
    <nav className=" space-y-8 px-2 lg:px-4">
      {appLinks.map((item) => (
        <div key={item.category}>
          <div className="mb-2 text-xs px-3 font-semibold uppercase">
            {item.category}
          </div>
          <div className="grid items-start text-sm font-medium">
            {item.links.map((link) => {
              const isActive = pathname == link.href;

              return (
                <Link
                  key={link.title}
                  href={link?.href}
                  className={cn(
                    "flex links-center gap-3 px-3 rounded-lg py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.title}
                  {link.notificationCount > 0 && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {link.notificationCount}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default SidebarItems;

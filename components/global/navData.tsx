import CompleteLogo from "@/components/icons/CompleteLogo";
import UimCommentAltMessage from "@/components/icons/UimCommentAltMessage";
import UimGraduation from "@/components/icons/UimGraduation";
import UimHistory from "@/components/icons/UimHistory";
import UimSearch from "@/components/icons/UimSearch";
import UimUser from "@/components/icons/UimUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  BellRing,
  Euro,
  FileSearch,
  Gavel,
  Grip,
  History,
  LineChart,
  MessageSquarePlus,
  Scale,
} from "lucide-react";
import Link from "next/link";
import UimTachometerFast from "../icons/UimTachometerFast";
import UimNotes from "../icons/UimNotes";

export const navLeftItems = [
  {
    com: (
      <h1 className="text-background text-2xl font-bold inline-flex">
        <CompleteLogo className={cn("w-44 h-7 text-brand")} />
      </h1>
    ),
  },
];

export const initialNav = [
  {
    label: "Use Cases",
    dropdown: [
      {
        label: "Layman / General User",
        link: "/usecases/layman",
      },
      {
        label: "Law student",
        link: "/usecases/lawstudent",
        disabled: true,
      },
      {
        label: "Legal Professional",
        link: "/usecases/legalprofessional",
        disabled: true,
      },
    ],
  },

  {
    label: "Pricing",
    link: "/pricing",
  },
  {
    label: "Articles",
    link: "/articles",
  },
  {
    label: "FAQ",
    link: "/faq",
  },
  {
    label: "About",
    link: "/about",
  },
];

export const navCenterItems = [
  {
    icon: <Scale className="w-4 h-4" />,
    label: "Search",
    link: "/",
  },
  {
    icon: <MessageSquarePlus className="w-4 h-4" />,
    label: "Chats",
    link: "/chat",
  },
  {
    icon: <Gavel className="w-4 h-4 -scale-x-100" />,
    label: "Citations Search",
    link: "/cs",
  },
  {
    icon: <FileSearch className="w-4 h-4" />,
    label: "Saved Search Result",
    link: "/ssr",
  },
  {
    icon: <History className="w-4 h-4" />,
    label: "Search History",
    link: "/sh",
  },
];

export const iconbarItems = [
  {
    icon: UimCommentAltMessage,
    active: true,
    label: "chat",
    link: "/",
  },
  {
    icon: LineChart,
    active: true,
    label: "Finance",
    link: "/finance",
  },
  {
    icon: Euro,
    active: true,
    label: "Forex",
    link: "/forex",
  },
  {
    icon: UimHistory,
    label: "history",
    link: "#",
  },
  {
    icon: UimUser,
    label: "profile",
    link: "#",
  },
];

export const navRightItems = [
  {
    com: <Grip className="w-6 h-6 text-background" />,
  },
  {
    com: (
      <Link href={"/signin"}>
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    ),
  },
  {
    com: (
      <BellRing className="w-6 h-6 text-background/70 hover:text-background" />
    ),
  },
];

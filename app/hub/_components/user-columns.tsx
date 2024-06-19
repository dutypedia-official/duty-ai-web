"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  invoiceId: string;
  number: number;
  children: any;
  firstName: any;
  lastName: string;
  dueDate: string;
  total: number;
  emailAddresses: any;
  createdAt: string;
  lastSignInAt: string;
  lastActiveAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return <div className="min-w-[10rem]">ID</div>;
  //   },
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="min-w-[10rem]">Name</div>;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.original?.firstName} {row.original?.lastName}
      </div>
    ),
  },

  {
    accessorKey: "emailAddress",
    header: ({ column }) => {
      return <div className="min-w-[8rem]">Email</div>;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.original?.emailAddresses[0]?.emailAddress || "-"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <div className="w-24">Join Date</div>;
    },
    cell: ({ row }) => (
      <div className="">
        {format(new Date(row.original?.createdAt), "dd MMM yyyy p")}
      </div>
    ),
  },
  {
    accessorKey: "lastSignInAt",
    header: ({ column }) => {
      return <div className="min-w-24">Last Active</div>;
    },
    cell: ({ row }) => (
      <div className="">
        {format(new Date(row.original?.lastActiveAt), "dd MMM yyyy p")}
      </div>
    ),
  },
];

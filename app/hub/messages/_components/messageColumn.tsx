"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// This type is used to define the shape of our data.
export type Item = {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <>
          {new Date(row.original.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }) +
            ", " +
            new Date(row.original.createdAt).toDateString()}
        </>
      );
    },
  },
];

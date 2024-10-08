"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Satuan = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Satuan>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Satuan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const satuan = row.original;
      return (
        <a
          href={`/admin/satuan/edit/${satuan.id}`}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 cursor-pointer"
        >
          Edit
        </a>
      );
    },
  },
];

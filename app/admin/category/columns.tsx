"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { redirect } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string;
  category_name: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "category_name",
    id: "kategori",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <a
          href={`/admin/category/edit/${category.id}`}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 cursor-pointer"
        >
          Edit
        </a>
      );
    },
  },
];

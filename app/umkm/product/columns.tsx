"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string;
  product_name: string;
  price_per_satuan: string;
  price: string;
  category: string;
  satuan: string;
};

const handleDelete = async (id: string) => {
  const res = await fetch(`/api/${id}`, {
    method: "DELETE",
  });
  location.reload();
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Produk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price_per_satuan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga Per Satuan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pricePerSatuan = parseFloat(row.getValue("price_per_satuan"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(pricePerSatuan);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
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
    cell: ({ row }) => {
      const category: any = row.getValue("category");
      const formatted = category;

      return <div className="font-medium">{formatted?.category_name}</div>;
    },
  },
  {
    accessorKey: "satuan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Satuan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category: any = row.getValue("satuan");
      const formatted = category;

      return <div className="font-medium">{formatted.name}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-2">
          <a
            href={`/umkm/product/edit/${product.id}`}
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800 cursor-pointer"
          >
            Edit
          </a>
          <button
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 cursor-pointer"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </div>
      );
    },
  },
];

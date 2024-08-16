"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { FaPlus } from "react-icons/fa6";
import { DataTable } from "./data-table";
import Sidebar from "@/app/components/Sidebar";

let success = null;
let failed = null;

const Page = () => {
  const [data, setData] = useState(null);
  const getCategories = async () => {
    const res = await fetch(process.env.APP_URL + `/api/category`);
    const resp = await res.json();
    setData(resp);
    return data;
  };
  useEffect(() => {
    getCategories();
  }, []);
  const filter = "kategori";
  return (
    <>
      <Sidebar />
      <section className="py-24 sm:ml-[16rem]">
        <div className="container">
          <div className="flex gap-4 items-center justify-between">
            <h1 className="text-3xl font-bold mb-2">Kategori</h1>
            <a
              href="/admin/category/add"
              className="bg-blue-600 text-white px-2 py-1 font-semibold rounded-lg flex gap-2 items-center"
            >
              <FaPlus />
              Tambah Kategori
            </a>
          </div>
          {data && <DataTable columns={columns} data={data} filter={filter} />}
        </div>
      </section>
    </>
  );
};

export default Page;

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
  const getUMKMs = async () => {
    const res = await fetch(`http://localhost:3000/api/umkm`);
    const resp = await res.json();
    setData(resp);
    return data;
  };
  useEffect(() => {
    getUMKMs();
  }, []);
  const link = "http://localhost:3000/admin/umkm";
  const api = "http://localhost:3000/api/umkm";
  const filter = "Nama UMKM";
  const dataType = "umkm";
  return (
    <>
      <Sidebar />
      <section className="py-24 sm:ml-[16rem]">
        <div className="container">
          <div className="flex gap-4 items-center justify-between">
            <h1 className="text-3xl font-bold mb-2">UMKM</h1>
            <a
              href="/admin/umkm/add"
              className="bg-blue-600 text-white px-2 py-1 font-semibold rounded-lg flex gap-2 items-center"
            >
              <FaPlus />
              Tambah UMKM
            </a>
          </div>
          {data && (
            <DataTable
              columns={columns}
              data={data}
              link={link}
              api={api}
              success={success}
              failed={failed}
              dataType={dataType}
              filter={filter}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Page;

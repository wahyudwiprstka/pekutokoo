"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { FaPlus } from "react-icons/fa6";
import Sidebar from "@/app/components/Sidebar";
import { DataTable } from "./data-table";
import Loading from "@/app/components/Loading";

let success = null;
let failed = null;

const Satuan = async () => {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("name");

  const getSatuans = async () => {
    const res = await fetch(process.env.APP_URL + `/api/satuan`);
    const resp = await res.json();

    setData(resp);
  };

  useEffect(() => {
    getSatuans();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <Sidebar />
          <section className="py-24 sm:ml-[16rem]">
            <div className="container">
              <div className="mb-2 flex gap-4 items-center justify-between">
                <h1 className="text-3xl font-bold mb-2">Satuan</h1>
                <a
                  href="/admin/satuan/add"
                  className="bg-blue-600 text-white px-2 py-1 font-semibold rounded-lg flex gap-2 items-center"
                >
                  <FaPlus />
                  Tambah Satuan
                </a>
              </div>
              <DataTable columns={columns} data={data} filter={filter} />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Satuan;

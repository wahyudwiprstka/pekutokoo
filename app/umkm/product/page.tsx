"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { FaPlus } from "react-icons/fa6";
import Sidebar from "@/app/components/Sidebar";
import { DataTable } from "./data-table";

let success = null;
let failed = null;

const Page = () => {
  const [data, setData] = useState(null);
  const getProducts = async () => {
    const res = await fetch(process.env.APP_URL + `/api/product`);
    const resp = await res.json();
    setData(resp);
    return data;
  };
  useEffect(() => {
    getProducts();
  }, []);
  const link = "/umkm/product";
  const api = "/api/product";
  const filter = "product_name";
  const dataType = "product";
  return (
    <>
      <Sidebar />
      <section className="py-24 sm:ml-[16rem]">
        <div className="container">
          <div className="flex gap-4 items-center justify-between">
            <h1 className="text-3xl font-bold mb-2">Produk</h1>
            <a
              href="/umkm/product/add"
              className="bg-blue-600 text-white px-2 py-1 font-semibold rounded-lg flex gap-2 items-center"
            >
              <FaPlus />
              Tambah Produk
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

"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { FaRegUser, FaArrowRight, FaBoxOpen, FaStore } from "react-icons/fa6";

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [umkms, setUmkms] = useState<any[]>([]);

  const getProducts = async () => {
    const res = await fetch(process.env.APP_URL + "/api/product");
    const data = await res.json();
    setProducts(data);
  };
  const getUsers = async () => {
    const res = await fetch(process.env.APP_URL + "/api/user");
    const data = await res.json();
    setUsers(data);
  };
  const getUmkms = async () => {
    const res = await fetch(process.env.APP_URL + "/api/umkm");
    const data = await res.json();
    setUmkms(data);
  };
  useEffect(() => {
    getUsers();
    getUmkms();
    getProducts();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="sm:ml-[17rem] mt-[5rem] sm:mr-4">
        {/* JUMLAH SECTION */}
        <div className="flex flex-wrap justify-center gap-6 items-center">
          {/* TOTAL USER */}
          <div>
            <div className="bg-blue-600 rounded-t py-4 px-8 w-[80vw] sm:w-[35vw] md:w-[25vw] text-white flex gap-6 justify-center items-center">
              <FaRegUser className="text-4xl" />
              <div>
                <h1 className="font-bold text-2xl">Total User</h1>
                <p>{users?.length}</p>
              </div>
            </div>
            <a
              href="/"
              className="bg-blue-600 py-1 px-4 text-white flex items-center gap-2 border-t border-gray-200 rounded-b"
            >
              Lihat Selengkapnya <FaArrowRight />
            </a>
          </div>
          {/* END OF TOTAL USER */}

          {/* TOTAL PRODUK */}
          <div>
            <div className="bg-yellow-400 rounded-t py-4 px-8 w-[80vw] sm:w-[35vw] md:w-[25vw] text-white flex gap-6 justify-center items-center">
              <FaBoxOpen className="text-4xl" />
              <div>
                <h1 className="font-bold text-2xl">Total Produk</h1>
                <p>{products?.length}</p>
              </div>
            </div>
            <a
              href="/"
              className="bg-yellow-400 py-1 px-4 text-white flex items-center gap-2 border-t border-gray-200 rounded-b"
            >
              Lihat Selengkapnya <FaArrowRight />
            </a>
          </div>
          {/* END OF TOTAL PRODUK */}

          {/* TOTAL KATEGORI */}
          <div>
            <div className="bg-red-600 rounded-t py-4 px-8 w-[80vw] sm:w-[35vw] md:w-[25vw] text-white flex gap-6 justify-center items-center">
              <FaStore className="text-4xl" />
              <div>
                <h1 className="font-bold text-2xl">Total UMKM</h1>
                <p>{umkms?.length}</p>
              </div>
            </div>
            <a
              href="/"
              className="bg-red-600 py-1 px-4 text-white flex items-center gap-2 border-t border-gray-200 rounded-b"
            >
              Lihat Selengkapnya <FaArrowRight />
            </a>
          </div>
          {/* END OF TOTAL KATEGORI */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

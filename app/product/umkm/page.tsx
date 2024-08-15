"use client";

import Navbar from "@/app/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import "@/public/styles/productCard.css";
import Footerr from "@/app/components/Footerr";

const UmkmList = () => {
  const [umkms, setUmkms] = useState<any[]>([]);

  const getUmkms = async () => {
    const res = await fetch("/api/umkm");
    const data = await res.json();

    setUmkms(data);
  };

  useEffect(() => {
    getUmkms();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <h2 className="text-2xl font-bold text-center mt-2 mb-4">
          UMKM Terdaftar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center flex-wrap justify-center container gap-4 pb-4">
          {umkms &&
            umkms?.map((umkm) => (
              <a href={`/product/umkm/details/${umkm?.id}`} key={umkm?.id}>
                <Card>
                  <CardContent className="card-content flex flex-col items-center justify-center p-4">
                    {/* GAMBAR BARANG */}
                    <div className="card-img overflow-hidden rounded-lg">
                      <img
                        src={`/images/store.jpg`}
                        alt="Product Image"
                        className="object-cover !w-16 object-center rounded-lg mb-2 card-img"
                      />
                    </div>
                    {/* END OF GAMBAR BARANG */}

                    {/* TITLE PRODUK */}
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-xl">
                      {umkm?.umkm_name}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
        </div>
      </div>
      <Footerr />
    </>
  );
};

export default UmkmList;

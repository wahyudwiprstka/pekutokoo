"use client";

import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa6";
import "@/public/styles/productCard.css";
import Footerr from "@/app/components/Footerr";

const UmkmDetails = () => {
  const [umkm, setUmkm] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [wa, setWa] = useState("");

  const params = useParams();

  const id = params.id;

  const getUmkm = async () => {
    const res = await fetch(`/api/umkm/${id}`);
    const data = await res.json();

    setUmkm(data);
    let phonenumber = data.wa_number;
    phonenumber = "+62" + phonenumber.slice(1);

    setWa(phonenumber);
  };

  const getProducts = async () => {
    const res = await fetch(`/api/product/umkm/${id}`);
    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    getUmkm();
    getProducts();
  }, []);

  const path = usePathname();
  const pathname = path.split("/").filter((path) => path);

  console.log(pathname);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Card className="w-[80vw] md:w-[60vw] xl:w-[40vw] py-4 my-4 m-auto mt-4">
          <CardContent>
            <div className="flex gap-4 justify-center items-center">
              <img src="/images/store.jpg" width={250} />
              <div className="flex flex-col gap-2">
                {/* UMKM NAME */}
                <h2 className="font-bold text-2xl m-0">{umkm?.umkm_name}</h2>
                <p>Produk: {products?.length}</p>
                <a href={`https://wa.me/${wa}`} target="_blank">
                  <Button className="flex gap-3">
                    <img src="/logo/whatsapp.png" width={20} /> Hubungi Penjual
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-center font-bold text-2xl my-4">
          Produk Oleh UMKM Ini:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center flex-wrap justify-center container gap-4 pb-4">
          {products &&
            products?.map((product) => (
              <a href={`/product/details/${product?.id}`} key={product?.id}>
                <Card>
                  <CardContent className="card-content flex flex-col justify-center p-4">
                    {/* GAMBAR BARANG */}
                    <div className="card-img overflow-hidden rounded-lg">
                      <img
                        src={`${product?.image_url}`}
                        alt="Product Image"
                        className="object-cover !w-16 object-center rounded-lg mb-2 card-img"
                      />
                    </div>
                    {/* END OF GAMBAR BARANG */}

                    {/* TITLE PRODUK */}
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {product?.product_name}
                    </p>

                    {/* HARGA BARANG */}
                    <h2 className="text-start font-bold text-indigo-600">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product?.price)}
                    </h2>
                    {/* END OF HARGA BARANG */}

                    {/* UMKM */}
                    <div className="flex gap-2 items-center">
                      <FaStore />
                      <a
                        href={`/umkm/details/${umkm?.id}`}
                        className="hover:underline"
                      >
                        <p>{umkm?.umkm_name}</p>
                      </a>
                    </div>
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

export default UmkmDetails;

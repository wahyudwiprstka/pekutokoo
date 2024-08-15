"use client";

import Navbar from "@/app/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa6";

import "@/public/styles/productCard.css";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState<any[]>([]);

  const getProducts = async () => {
    const res = await fetch(`/api/product/search/${search}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container">
        <h2 className="my-2 font-bold text-2xl">
          Hasil pencarian untuk {search}:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center container justify-items-center gap-4 pb-4">
          {products.length > 0 ? (
            products?.map((product: any) => (
              <a href={`/product/details/${product?.id}`} key={product?.id}>
                <Card>
                  <CardContent className="card-content flex flex-col justify-center p-4">
                    <div className="card-img overflow-hidden">
                      {/* GAMBAR BARANG */}
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
                        href={`/umkm/${product?.umkm?.id}`}
                        className="hover:underline"
                      >
                        <p>{product?.umkm?.umkm_name}</p>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))
          ) : (
            <p>Tidak ada data!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa6";

const ProductListing = () => {
  const [products, setProducts] = useState<any[]>([]);

  const getProducts = async () => {
    const res = await fetch(process.env.APP_URL + "/api/product");
    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <h1 className="py-4 text-center font-bold text-2xl">Produk</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center flex-wrap justify-center container gap-4 pb-4 overflow-hidden max-w-[100vw]">
        {products &&
          products?.map((product) => (
            <a key={product?.id} href={`/product/details/${product?.id}`}>
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
                      href={`/product/umkm/details/${product?.umkm?.id}`}
                      className="hover:underline"
                    >
                      <p>{product?.umkm?.umkm_name}</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
      </div>
    </>
  );
};

export default ProductListing;

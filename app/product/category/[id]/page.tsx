"use client";

import Loading from "@/app/components/Loading";
import Navbar from "@/app/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa6";
import "@/public/styles/productCard.css";
import Footerr from "@/app/components/Footerr";

const Category = () => {
  const [category, setCategory] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);

  const params = useParams();
  const id = params.id;

  const getCategory = async () => {
    const res = await fetch(`/api/category/${id}`);
    const data = await res.json();
    setCategory(data);
  };

  const getProducts = async () => {
    const res = await fetch(`/api/product/category/${id}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  return (
    <>
      {!category ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="container min-h-[80vh]">
            <h2 className="text-center font-bold text-2xl my-3">
              Produk Dalam Kategori {category?.category_name}
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
                            href={`/umkm/details/${product?.umkm?.id}`}
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
          </div>
        </div>
      )}
      <Footerr />
    </>
  );
};

export default Category;

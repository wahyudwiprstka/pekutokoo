"use client";

import Footerr from "@/app/components/Footerr";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Zoom } from "reactjs-image-zoom";
import "@/public/styles/productCard.css";
import { Button } from "@/components/ui/button";
import { FaStore } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetails = () => {
  const [product, setProduct] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);

  const [wa_number, setWaNumber] = useState(null);

  const params = useParams();

  const id = params.id;

  const message = `Halo, apakah produk ini masih tersedia? \n ${process.env.APP_URL}/product/details/${id}`;

  const getProduct = async () => {
    const res = await fetch(process.env.APP_URL + `/api/product/${id}`);
    const data = await res.json();
    setProduct(data);
    let tempPhoneNumber = data.umkm.wa_number;
    tempPhoneNumber = "+62" + tempPhoneNumber.slice(1);
    setWaNumber(tempPhoneNumber);
  };

  const getProducts = async () => {
    const res = await fetch(
      process.env.APP_URL + `/api/product?page=1&itemsPerPage=12`
    );
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProduct();
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="container my-8 grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-6">
          <Zoom
            width={150} // width in percent default is 100%
            height={500} // height of the box
            maxwidth={500} // width of the box
            position="center" // cover
            imagesrc={product?.image_url} // Image component | URL
            size={200} // it is in percent
            bgsize="cover" // background-size
            cursor="zoom-in" // pointer
            className="img-box rounded-lg" // classname for box
          />
          <div>
            {/* PRODUCT NAME */}
            <h2 className="font-bold mb-4 text-2xl">{product?.product_name}</h2>

            {/* DESCRIPTION OF PRODUCT */}
            <p className="mb-4">
              {product?.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Minus tempore doloribus sapiente similique neque
              eveniet reiciendis excepturi, officiis soluta, maxime asperiores,
              deserunt cum voluptatem totam ipsam quaerat doloremque earum sed?
            </p>

            {/* UMKM */}
            <div className="flex gap-3 items-center mb-4">
              <FaStore className="text-xl" />
              <div>
                <a href={`/umkm/`} className="mb-4 hover:underline">
                  {product?.umkm?.umkm_name}
                </a>
              </div>
            </div>

            {/* PRICE */}
            <p className="font-bold text-xl text-indigo-600 mb-4">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(product?.price)}
            </p>

            {/* ORDER BUTTON */}
            <a
              href={`https://wa.me/${wa_number}?text=${message}`}
              target="_blank"
            >
              <Button className="bg-indigo-600 flex items-center gap-3 text-base">
                <img src="/logo/whatsapp.png" width={30} />
                Hubungi Penjual
              </Button>
            </a>
          </div>
        </div>

        <div className="container">
          <h2 className="text-center font-bold text-2xl mb-4">
            Produk Lainnya
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
                          href={`/umkm/${product?.umkm?.id}`}
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
      <Footerr />
    </>
  );
};

export default ProductDetails;

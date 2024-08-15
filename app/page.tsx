"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaCaretDown, FaPhone, FaStore } from "react-icons/fa6";
import Autoplay from "embla-carousel-autoplay";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel } from "flowbite-react";
import { useInView } from "react-intersection-observer";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import Footerr from "./components/Footerr";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "@/public/styles/landing.css";
import "@/public/styles/productCard.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import ProductListing from "./components/ProductListing";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  const getCategories = async () => {
    const res = await fetch("http://localhost:3000/api/category");
    const data = await res.json();
    setCategories(data);
  };

  const getProducts = async () => {
    const res = await fetch(
      `http://localhost:3000/api/product?page=${page}&itemsPerPage=${itemsPerPage}`
    );
    const data = await res.json();
    setProducts(data);
  };

  function delay(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const loadMoreProducts = async () => {
    await delay(2000);
    const nextPage = page + 1;
    setPage(nextPage);
    const newProducts = await fetch(
      `http://localhost:3000/api/product?page=${nextPage}&itemsPerPage=${itemsPerPage}`
    );
    const data = await newProducts.json();
    setProducts((prevValue) => [...prevValue, ...data]);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <>
      {products.length === 0 ? (
        <Loading />
      ) : (
        <div className="min-h-screen overflow-hidden">
          <Navbar />

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper rounded mt-4 overflow-hidden"
          >
            <SwiperSlide>
              <img src={"/banner/pekutoko_banner.png"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"/banner/pakaian.png"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"/banner/peralatan_rumah_tangga.png"} />
            </SwiperSlide>
          </Swiper>

          <h1 className="py-4 text-center font-bold text-2xl">Kategori</h1>
          <div className="px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center flex-wrap gap-6 overflow-hidden">
            {categories &&
              categories?.map((category) => (
                <Card className="text-center" key={category?.id}>
                  <a
                    href={`http://localhost:3000/product/category/${category?.id}`}
                    className="block !min-w-[150px] !py-10"
                  >
                    {category?.category_name}
                  </a>
                </Card>
              ))}
          </div>

          <ProductListing />

          <Footerr />
        </div>
      )}
    </>
  );
};

export default LandingPage;

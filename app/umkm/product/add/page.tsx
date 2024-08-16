"use client";

import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { uploadImage } from "@/lib/imageUpload";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/app/components/Loading";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const AddProduct = () => {
  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price_per_satuan, setPricePerSatuan] = useState("");
  const [price, setPrice] = useState("");
  const [umkm, setUMKM] = useState<any>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [satuans, setSatuans] = useState<any[]>([]);
  const [satuan, setSatuan] = useState("");
  const [category, setCategory] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const router = useRouter();

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];

    setImageUpload(imageFile);

    const preview = URL.createObjectURL(imageFile);

    setImagePreview(preview);

    console.log(imageFile);
  };

  async function getSatuan() {
    const res = await fetch(process.env.APP_URL + "/api/satuan");
    const data = await res.json();
    if (data) {
      setSatuans(data);
      setSatuan(data[0].id);
    }
  }

  async function getCategory() {
    const res = await fetch(process.env.APP_URL + "/api/category");
    const data = await res.json();
    if (data) {
      setCategories(data);
      setCategory(data[0].id);
    }
  }

  async function getUMKM() {
    const res = await fetch(process.env.APP_URL + `/api/umkm/user/${userId}`);
    const data = await res.json();
    console.log(data);
    setUMKM(data);
  }

  useEffect(() => {
    getCategory();
    getSatuan();
    getUMKM();
  }, [session]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !umkm ||
      !product_name ||
      !description ||
      !price_per_satuan ||
      !price ||
      !category ||
      !satuan ||
      !imageUpload
    ) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }

    const postApi = async (url: string) => {
      const res = await fetch(process.env.APP_URL + "/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name,
          description,
          price_per_satuan,
          price,
          umkm,
          category,
          satuan,
          image_url: url,
        }),
      });

      if (res.ok) {
        setSuccess("Berhasil membuat Produk!");
        setError("");
        res.json().then((res) => {
          console.log(res.message);
        });
        router.push("/umkm/product");
      } else {
        res.json().then((res) => {
          if (!success) {
            setError(res.error);
            setSuccess("");
            console.log(res.error);
          }
        });
      }
    };
    await uploadImage(imageUpload, "product", postApi);
  };

  return (
    <>
      {satuans == null || categories == null || umkm == null ? (
        <Loading />
      ) : (
        <div>
          <Sidebar />
          {/* START OF FORM */}
          <form
            method="POST"
            action="/"
            className="min-h-[100vh] flex justify-center items-center bg-slate-100 sm:ml-[16rem] pt-20 pb-4"
            onSubmit={handleSubmit}
          >
            <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] m-auto flex-col items-center justify-center bg-white p-4 rounded-lg shadow border border-slate-200">
              <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>

              {/* SUCCESS ALERT */}
              <div
                className={`${
                  success ? "block" : "hidden"
                } bg-green-400 rounded w-full p-2 shadow text-white mb-2 `}
              >
                <p>Berhasil Membuat Produk!</p>
              </div>
              {/* END OF SUCCESS ALERT */}

              {/* ERROR ALERT */}
              <div
                className={`${
                  error ? "block" : "hidden"
                } bg-red-600 rounded w-full p-2 shadow text-white mb-2 `}
              >
                <p>{error}</p>
              </div>
              {/* END OF ERROR ALERT */}

              {/* INPUT PRODUCT NAME */}
              <div className="mb-4">
                <label
                  htmlFor="product_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Produk
                </label>
                <div className="mt-2">
                  <Input
                    id="product_name"
                    name="product_name"
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>
              {/* END OF INPUT PRODUCT NAME */}

              {/* INPUT DESCRIPTION */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Deskripsi
                </label>
                <div className="mt-2">
                  <Textarea
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              {/* END OF INPUT DESCRIPTION */}

              {/* INPUT PRICE PER SATUAN */}
              <div className="mb-4">
                <label
                  htmlFor="price_per_satuan"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Harga Per Satuan
                </label>
                <div className="mt-2">
                  <Input
                    id="price_per_satuan"
                    name="price_per_satuan"
                    type="number"
                    onChange={(e) => setPricePerSatuan(e.target.value)}
                  />
                </div>
              </div>
              {/* END OF INPUT PRICE PER SATUAN */}

              {/* INPUT PRICE */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Harga Barang
                </label>
                <div className="mt-2">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              {/* END OF INPUT PRICE */}

              {/* INPUT CATEGORY */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kategori Barang
                </label>
                <div className="mt-2">
                  <Select
                    onValueChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori Barang" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories &&
                        categories?.map((category) => (
                          <SelectItem value={category?.id} key={category?.id}>
                            {category?.category_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* END OF INPUT CATEGORY */}

              {/* INPUT SATUAN */}
              <div className="mb-4">
                <label
                  htmlFor="satuan"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Satuan
                </label>
                <div className="mt-2">
                  <Select
                    onValueChange={(value) => {
                      setSatuan(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Satuan Barang" />
                    </SelectTrigger>
                    <SelectContent>
                      {satuans &&
                        satuans?.map((satuan) => (
                          <SelectItem value={satuan?.id} key={satuan?.id}>
                            {satuan?.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* END OF INPUT SATUAN */}

              {/* INPUT IMAGE */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gambar Produk
                </label>
                <div className="mt-2">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              {/* END OF INPUT IMAGE */}

              {imageUpload && (
                <div className="mb-2">
                  <h3 className="font-semibold mb-2">Gambar Saat Ini:</h3>
                  <Image
                    src={imagePreview}
                    width={1000}
                    height={1000}
                    alt="Product Image"
                    className="w-full"
                  />
                </div>
              )}

              <Button className="w-full bg-violet-600">Submit</Button>
            </div>
          </form>
          {/* END OF FORM */}

          <Footer />
        </div>
      )}
    </>
  );
};

export default AddProduct;

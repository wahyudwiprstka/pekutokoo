"use client";

import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import Loading from "@/app/components/Loading";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { uploadImage } from "@/lib/imageUpload";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const EditProduct = () => {
  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price_per_satuan, setPricePerSatuan] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState(null);
  const [satuans, setSatuans] = useState(null);
  const [satuan, setSatuan] = useState("");
  const [category, setCategory] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [product, setProduct] = useState(null);

  const {data: session, status} = useSession();

  const userId = session?.user?.id;
  
  const params = useParams();

  const id = params.id;

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    setImageUrl(null);

    setImageUpload(imageFile);

    const preview = URL.createObjectURL(imageFile);

    setImagePreview(preview);

    console.log(imageFile);
  };


  async function getProduct(){
    const res = await fetch(`/api/product/${id}`);
    const data = await res.json();
    setProduct(data);
    setProductName(data.product_name)
    setDescription(data.description)
    setPricePerSatuan(data.price_per_satuan)
    setPrice(data.price)
    setCategory(data.category.id)
    setSatuan(data.satuan.id)
    setImageUrl(data.image_url)
  }

  async function getSatuan(){
    const res = await fetch('/api/satuan');
    const data = await res.json();
    if(data){
      setSatuans(data);
      setSatuan(data[0].id);
    }
  }

  async function getCategory(){
    const res = await fetch('/api/category');
    const data = await res.json();
    if(data){
      setCategories(data);
      setCategory(data[0].id);
    }
  }

  async function getUMKM(){
    const res = await fetch(`/api/umkm/user/${userId}`)
    const data = await res.json();
    console.log(data);
    setUMKM(data);
  }

  useEffect(() => {
    getCategory();
    getSatuan();
    getProduct();
  },[])

  console.log(imageUpload); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userId);

    console.log(product.id_umkm);

    console.log('umkm: ' + product.id_umkm + ' product name: ' + product_name + ' description: ' + description + ' Price Per Satuan: ' + price_per_satuan + ' price: ' + price + 'category: ' + category + ' satuan: ' + satuan);

    if (!product.id_umkm || !product_name || !description || !price_per_satuan || !price || !category || !satuan || (!imageUpload && !imageUrl)) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }


    try {
      const umkm = product.id_umkm;
      const postApi = async(url) => {
        const res = await fetch(`/api/product/${id}`, {
          method: "PUT",
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
            image_url: url
          }),
        });
  
        if (res.ok) {
          setSuccess("Berhasil membuat Produk!");
          setError("");
          res.json().then((res) => {
            console.log(res.message);
          });
        } else {
          res.json().then((res) => {
            if (!success) {
              setError(res.error);
              setSuccess("");
              console.log(res.error);
            }
          });
        }
      }
      if(imageUrl){
        await postApi(imageUrl);
      }else{
        await uploadImage(imageUpload, 'product', postApi);
      }
          
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {/*{satuans == null || categories == null || umkm == null ? <Loading/> : (*/}

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
            <p>Berhasil Mengubah Produk!</p>
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
                defaultValue={product?.product_name}
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
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={product?.description}
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
                defaultValue={product?.price_per_satuan}
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
                defaultValue={product?.price}
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
              <Select onValueChange={(value) => {setCategory(value)}} defaultValue={product?.category?.id}>
                <SelectTrigger>
                  <SelectValue placeholder={product?.category?.category_name} />
                </SelectTrigger>
                <SelectContent>
                  {categories && categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>{category.category_name}</SelectItem>
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
              <Select onValueChange={(value) => {setSatuan(value)}} defaultValue={product?.satuan?.id}>
                <SelectTrigger>
                  <SelectValue placeholder={product?.satuan?.name} />
                </SelectTrigger>
                <SelectContent>
                  {satuans && satuans.map((satuan) => (
                    <SelectItem key={satuan.id} value={satuan.id}>{satuan.name}</SelectItem>
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
              <Input id="image" name="image" type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
            </div>
          </div>
          {/* END OF INPUT IMAGE */}

            <div className="mb-2">
              <h3 className="font-semibold mb-2">Gambar Saat Ini:</h3>
              <Image src={imagePreview ? imagePreview : product?.image_url} width={1000} height={1000} alt="Product Image" className="w-full"/>
            </div>

          <Button className="w-full bg-violet-600">Submit</Button>
        </div>
      </form>
      {/* END OF FORM */}

      <Footer />
      </div>
      {/* )} */}
    </>
  );
};

export default EditProduct;

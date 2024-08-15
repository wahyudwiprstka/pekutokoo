"use client";

import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddUMKM = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [identity_number, setIdentity_number] = useState("");
  const [umkm_name, setUmkm_name] = useState("");
  const [umkm_address, setUmkm_address] = useState("");
  const [wa, setWa] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !identity_number ||
      !umkm_name ||
      !umkm_address ||
      !wa
    ) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/umkm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          identity_number,
          umkm_name,
          umkm_address,
          wa,
        }),
      });

      if (res.ok) {
        setSuccess("Berhasil membuat UMKM");
        setError("");
        res.json().then((res) => {
          console.log(res.message);
        });
        router.push("/admin/umkm");
      } else {
        res.json().then((res) => {
          if (!success) {
            setError(res.error);
            setSuccess("");
            console.log(res.error);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-slate-100">
        {/* START OF FORM */}
        <form
          method="POST"
          action="/"
          className="min-h-[100vh] flex justify-center items-center sm:ml-[16rem]"
          onSubmit={handleSubmit}
        >
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] mt-20 my-4 m-auto flex-col items-center justify-center bg-white p-4 rounded-lg shadow border border-slate-200">
            <h1 className="text-2xl font-bold mb-4">Tambah UMKM</h1>

            {/* SUCCESS ALERT */}
            <div
              className={`${
                success ? "block" : "hidden"
              } bg-green-400 rounded w-full p-2 shadow text-white mb-2 `}
            >
              <p>Berhasil Membuat UMKM</p>
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

            {/* INPUT NAMA PEMILIK */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama Pemilik UMKM
              </label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT NAMA PEMILIK */}

            {/* INPUT EMAIL */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT EMAIL */}

            {/* INPUT IDENTITY NUMBER (NIK) */}
            <div className="mb-4">
              <label
                htmlFor="identity_number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nomor Induk Kependudukan (NIK)
              </label>
              <div className="mt-2">
                <Input
                  id="identity_number"
                  name="identity_number"
                  type="text"
                  onChange={(e) => setIdentity_number(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT NIK */}

            {/* INPUT UMKM NAME */}
            <div className="mb-4">
              <label
                htmlFor="umkm_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama UMKM
              </label>
              <div className="mt-2">
                <Input
                  id="umkm_name"
                  name="umkm_name"
                  type="text"
                  onChange={(e) => setUmkm_name(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT UMKM NAME */}

            {/* INPUT UMKM ADDRESS */}
            <div className="mb-4">
              <label
                htmlFor="umkm_address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Alamat UMKM
              </label>
              <div className="mt-2">
                <Input
                  id="umkm_address"
                  name="umkm_address"
                  type="text"
                  onChange={(e) => setUmkm_address(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT UMKM ADDRESS */}

            {/* INPUT WHATSAPP NUMBER */}
            <div className="mb-4">
              <label
                htmlFor="wa"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nomor WhatsApp PIC
              </label>
              <div className="mt-2">
                <Input
                  id="wa"
                  name="wa"
                  type="text"
                  onChange={(e) => setWa(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT WHATSAPP NUMBER */}

            <button className="w-full bg-violet-600 py-2 text-white rounded hover:bg-violet-800 font-semibold">
              Submit
            </button>
          </div>
        </form>
        {/* END OF FORM */}
      </div>

      <Footer />
    </>
  );
};

export default AddUMKM;

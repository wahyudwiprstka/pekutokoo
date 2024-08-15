"use client";

import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [identity_number, setIdentity_number] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !identity_number) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          identity_number,
        }),
      });

      if (res.ok) {
        setSuccess("Berhasil membuat User!");
        setError("");
        router.push("/admin/user"); 
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />

      {/* START OF FORM */}
      <form
        method="POST"
        action="/"
        className="min-h-[100vh] flex justify-center items-center bg-slate-100 sm:ml-[16rem]"
        onSubmit={handleSubmit}
      >
        <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] m-auto flex-col items-center justify-center bg-white p-4 rounded-lg shadow border border-slate-200">
          <h1 className="text-2xl font-bold mb-4">Tambah User</h1>

          {/* SUCCESS ALERT */}
          <div
            className={`${
              success ? "block" : "hidden"
            } bg-green-400 rounded w-full p-2 shadow text-white mb-2 `}
          >
            <p>Berhasil Membuat User!</p>
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
              Nama
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

          <button className="w-full bg-violet-600 py-2 text-white rounded hover:bg-violet-800 font-semibold">
            Submit
          </button>
        </div>
      </form>
      {/* END OF FORM */}

      <Footer />
    </>
  );
};

export default AddUser;

"use client";

import Footer from "@/app/components/Footer";
import Loading from "@/app/components/Loading";
import Sidebar from "@/app/components/Sidebar";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddSatuan = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState(null);

  const params = useParams();

  const id = params.id;

  useEffect(() => {
    async function getSatuan() {
      const res = await fetch(process.env.APP_URL + `/api/satuan/${id}`);
      const resp = await res.json();
      setData(resp);
      setName(resp.name);
    }
    getSatuan();
  }, []);

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch(`/api/satuan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (res.ok) {
        setSuccess("Berhasil Mengubah Satuan");
        setError("");
        res.json().then((res) => {
          console.log(res.message);
        });
      } else {
        setError("Gagal Mengubah Satuan");
        setSuccess("");
        res.json().then((res) => {
          if (!success) {
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
      {data == null ? (
        <Loading />
      ) : (
        <div>
          <Sidebar />

          {/* START OF FORM */}
          <form
            method="POST"
            action="/"
            className="min-h-[100vh] flex justify-center items-center bg-slate-100 sm:ml-[16rem]"
            onSubmit={handleSubmit}
          >
            <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] m-auto flex-col items-center justify-center bg-white p-4 rounded-lg shadow border border-slate-200">
              <h1 className="text-2xl font-bold mb-4">Edit Satuan Produk</h1>

              {/* SUCCESS ALERT */}
              <div
                className={`${
                  success ? "block" : "hidden"
                } bg-green-400 rounded w-full p-2 shadow text-white mb-2 `}
              >
                <p>Berhasil Mengubah Satuan Produk!</p>
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

              {/* INPUT NAMA KATEGORI */}
              <div className="mb-4">
                <label
                  htmlFor="category_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Satuan Produk
                </label>
                <div className="mt-2">
                  <Input 
                    id="name"
                    name="name"
                    type="text" 
                    placeholder="Ex: Gram, Liter" 
                    defaultValue={data?.name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* END OF INPUT NAMA KATEGORI */}

              <button className="w-full bg-violet-600 py-2 text-white rounded hover:bg-violet-800 font-semibold">
                Submit
              </button>
            </div>
          </form>
          {/* END OF FORM */}

          <Footer />
        </div>
      )}
    </>
  );
};

export default AddSatuan;

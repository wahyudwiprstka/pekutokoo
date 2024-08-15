"use client";

import Footer from "@/app/components/Footer";
import Loading from "@/app/components/Loading";
import Sidebar from "@/app/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditUMKM = () => {
  const [email, setEmail] = useState("");
  const [umkm_name, setUmkm_name] = useState("");
  const [umkm_address, setUmkm_address] = useState("");
  const [wa, setWa] = useState("");
  const [status, setStatus] = useState("");
  const [UMKM, setUMKM] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const params = useParams();

  const id = params.id;

  useEffect(() => {
    async function getUMKM(){
      const umkm = await fetch(`http://localhost:3000/api/umkm/${id}`);
      const data = await umkm.json();
      setUMKM(data);
      setEmail(data.umkm_email);
      setUmkm_name(data.umkm_name);
      setUmkm_address(data.umkm_address);
      setWa(data.wa_number);
      setStatus(data.status);
    }
    getUMKM();
  }, [])

  console.log(status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !umkm_name || !umkm_address || !wa || !status) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/umkm/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          umkm_name,
          umkm_address,
          wa,
          status,
        }),
      });

      if (res.ok) {
        setSuccess("Berhasil mengubah UMKM");
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {UMKM === null ? <Loading/> : 
      (
        <div>
      <Sidebar />
      <div className="bg-slate-100">
        {/* START OF FORM */}
        <form
          method="POST"
          action="/"
          className="min-h-[100vh] flex justify-center items-center sm:ml-[16rem]"
          onSubmit={handleSubmit}
        >
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] m-auto flex-col items-center justify-center bg-white p-4 rounded-lg shadow border border-slate-200">
            <h1 className="text-2xl font-bold mb-4">Edit UMKM</h1>

            {/* SUCCESS ALERT */}
            <div
              className={`${
                success ? "block" : "hidden"
              } bg-green-400 rounded w-full p-2 shadow text-white mb-2 `}
            >
              <p>Berhasil Mengubah UMKM</p>
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

            {/* INPUT EMAIL */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email UMKM
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={UMKM.umkm_email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT EMAIL */}

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
                  defaultValue={UMKM.umkm_name}
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
                  defaultValue={UMKM.umkm_address}
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
                  defaultValue={UMKM.wa_number}
                  onChange={(e) => setWa(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT WHATSAPP NUMBER */}

            {/* INPUT STATUS */}
            <div className="mb-4">
              <label
                htmlFor="wa"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Status
              </label>
              <div className="mt-2">
                {/* <select onChange={(e) => setStatus(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value={UMKM.umkm_status} hidden selected>{UMKM.umkm_status == 1 ? "Aktif" : "Non Aktif"}</option>
                  <option value="1">Aktif</option>
                  <option value="0">Non Aktif</option>
                </select> */}
                <Select onValueChange={(value) => {setStatus(value)}} defaultValue={UMKM.umkm_status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori Barang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UMKM.umkm_status} className="hidden">{UMKM.umkm_status == 1 ? "Aktif" : "Non Aktif"}</SelectItem>
                    <SelectItem value='1'>Aktif</SelectItem>
                    <SelectItem value='0'>Non Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* END OF INPUT STATUS */}

            <button className="w-full bg-violet-600 py-2 text-white rounded hover:bg-violet-800 font-semibold">
              Submit
            </button>
          </div>
        </form>
        {/* END OF FORM */}
      </div>

      <Footer />
      </div>
  )}
    </>
  );
};

export default EditUMKM;

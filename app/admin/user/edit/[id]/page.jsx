"use client";

import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import Loading from "@/app/components/Loading";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const params = useParams();

  const id = params.id;

  async function getUser(){
      const user = await fetch(process.env.APP_URL + `/api/user/${id}`);
      const data = await user.json();
      setName(data.name);
      setEmail(data.email);
      setStatus(data.status);
      setRole(data.role);
      setUser(data);
  }
  
  useEffect(() => {
    getUser();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !status || !role) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch(process.env.APP_URL + `/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          status,
          role
        }),
      });

      if (res.ok) {
        setSuccess("Berhasil Mengubah User!");
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
    console.log(role)
    console.log(name)
    console.log(email)
    console.log(status)
  };

  console.log(role)
  console.log(name)
  console.log(email)
  console.log(status)

  return (
    <>
    {user == null ? <Loading/> : (
        <div>
      <Sidebar />

      {/* START OF FORM */}
      <form
        className="min-h-[100vh] flex justify-center items-center bg-slate-100 sm:ml-[16rem]"
        onSubmit={handleSubmit}
      >
        <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] m-auto flex-col items-center justify-center bg-white p-4 rounded-lg shadow border border-slate-200">
          <h1 className="text-2xl font-bold mb-4">Edit User</h1>

          {/* SUCCESS ALERT */}
          <div
            className={`${
              success ? "block" : "hidden"
            } bg-green-400 rounded w-full p-2 shadow text-white mb-2 `}
          >
            <p>Berhasil Mengubah User!</p>
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
                defaultValue={user.name}
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
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* END OF INPUT EMAIL */}

          {/* INPUT ROLE */}
          {user.role == 'UMKM' ? ''  : (
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2">
                <Select onValueChange={(value) => {setRole(value)}} defaultValue={user.role}>
                  <SelectTrigger>
                    <SelectValue placeholder={user.role} />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value={user.role} className="hidden">{user.role == 'UMKM' ? UMKM : ''}</SelectItem>
                      <SelectItem value='USER'>USER</SelectItem>
                      <SelectItem value='ADMIN'>ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          {/* END OF INPUT STATUS */}

          {/* INPUT STATUS */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Status
            </label>
            <div className="mt-2">
              {/* <select
                id="status"
                name="status"
                autoComplete="status"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={user.status} hidden>{user.status == 1 ? "Aktif" : 'Non Aktif'}</option>
                <option value='1'>Aktif</option>
                <option value='0'>Non Aktif</option>
                </select> */}
                <Select onValueChange={(value) => {setStatus(value)}} defaultValue={user.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value={user.status} className="hidden">{user.status == 1 ? "Aktif" : 'Non Aktif'}</SelectItem>
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

      <Footer />
      </div>
    )}
    </>
  );
};

export default AddUser;

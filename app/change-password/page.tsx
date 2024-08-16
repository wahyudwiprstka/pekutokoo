"use client";

import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import Loading from "@/app/components/Loading";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";
import Footerr from "@/app/components/Footerr";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();

  const id = session?.user?.id;

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!password || !confPass) {
      setError("Field tidak boleh kosong");
      setSuccess("");
      return;
    }

    if (password != confPass) {
      setError("Password tidak sesuai!");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch(
        process.env.APP_URL + `/api/user/${id}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      if (res.ok) {
        setSuccess("Berhasil Mengubah Password!");
        setError("");
        router.push("/profile");
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
      <div>
        <Navbar />

        {/* START OF FORM */}
        <form
          method="POST"
          action="/"
          className="min-h-[80vh] flex justify-center items-center bg-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] m-auto flex-col items-center justify-center bg-white p-4 rounded-lg shadow border border-slate-200">
            <h1 className="text-2xl font-bold mb-4">Edit Password</h1>

            {/* SUCCESS ALERT */}
            <div
              className={`${
                success ? "block" : "hidden"
              } bg-green-400 rounded w-full p-2 shadow text-white mb-2 `}
            >
              <p>Berhasil Mengubah Password!</p>
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

            {/* INPUT PASSWORD */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* END OF INPUT NAMA PEMILIK */}

            {/* INPUT CONFIRM PASSWORD */}
            <div className="mb-4">
              <label
                htmlFor="confPass"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confPass"
                  name="confPass"
                  type="password"
                  autoComplete="confPass"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setConfPass(e.target.value)}
                />
              </div>
            </div>
            {/* END OF CONFIRM PASSWORD */}

            <button className="w-full bg-violet-600 py-2 text-white rounded hover:bg-violet-800 font-semibold">
              Submit
            </button>
          </div>
        </form>
        {/* END OF FORM */}

        <Footerr />
      </div>
    </>
  );
};

export default ChangePassword;

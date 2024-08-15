"use client";

import React, { FormEvent, Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Loading from "@/app/components/Loading";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log(email);
  console.log(password);

  const searchParams = useSearchParams();

  const loginerr = searchParams.get("error");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email);

    if (!email || !password) {
      setError("Email atau Password tidak boleh kosong");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        const err = res.error;
        setError("Email atau password tidak sesuai");
        console.log(err);
        return;
      }

      console.log(res);

      router.replace("/");
    } catch (error: any) {
      console.log(error.message);
      return error;
    }
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="min-h-[100vh] bg-gray-200">
          <div className="min-h-[100vh] flex flex-col justify-center items-center">
            {(loginerr || error) && (
              <div
                role="alert"
                className="alert alert-error bg-red-500 text-white mx-auto mb-4 shadow w-[80vw] lg:w-[40vw]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {loginerr ? <span>{loginerr}</span> : <span>{error}</span>}
                {/* <span>{error}</span> */}
              </div>
            )}

            <Card className="flex flex-col justify-center px-6 lg:px-8 items-center py-4 w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] border bg-white">
              <div className="sm:mx-auto sm:max-w-sm">
                <Image
                  className="mx-auto h-[100px] w-auto"
                  width={1000}
                  height={1000}
                  src="/logo/Pekutoko.png"
                  alt="Your Company"
                />
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign In User
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  className="space-y-6"
                  // action="/api/user"
                  // method="POST"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <p className="block mt-4 text-sm">
                  Login Sebagai{" "}
                  <a className="text-indigo-600" href="/auth/umkm/signin">
                    UMKM
                  </a>{" "}
                  |{" "}
                  <a className="text-indigo-600" href="/auth/admin/signin">
                    Admin
                  </a>
                </p>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Pekutoko 2024
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default SignIn;

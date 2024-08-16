"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [identity_number, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      name == "" ||
      email == "" ||
      identity_number == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      setError("Form tidak boleh kosong");
      return;
    }

    try {
      const res = await fetch(process.env.APP_URL + "/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          identity_number,
          password,
        }),
      });

      if (res.ok) {
        router.push("/auth/user/signin");
      } else {
        const err = await res.json();
        setError(err);
      }
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div>
        <Card className="bg-white border-b-indigo-600 border-b-2">
          <img src="/logo/Pekutoko.png" className="m-auto w-20 mt-2" />
          <CardHeader className="font-bold text-2xl pb-0 mb-4">
            Registrasi
          </CardHeader>

          {/* ERROR */}
          {error !== "" ? (
            <div className="my-4 flex justify-center items-center bg-red-600 text-white mx-6 rounded py-1 px-2">
              <p>{error}</p>
            </div>
          ) : undefined}
          {/* END OF ERROR */}

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  className="w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="identity_number">NIK</Label>
                <Input
                  name="identity_number"
                  id="identity_number"
                  type="text"
                  className="w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]"
                  onChange={(e) => setIdentityNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword !== "" && password !== confirmPassword ? (
                  <p className="text-red-600">Password tidak sesuai</p>
                ) : undefined}
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-900">
                Submit
              </Button>
            </form>
            <p className="text-sm mt-2 text-center text-gray-600">
              Pekutoko 2024
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

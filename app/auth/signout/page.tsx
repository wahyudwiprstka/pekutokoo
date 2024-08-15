"use client";
import Footerr from "@/app/components/Footerr";
import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Signout = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center mt-[-50px]">
        <div className=" flex justify-center items-center flex-col border border-gray-300 rounded-lg px-10 py-4">
          <p className="font-semibold text-2xl">Logout?</p>
          <div className="flex gap-4 mt-2">
            <Button onClick={() => signOut({ callbackUrl: "/" })}>Yes</Button>
            <Button
              onClick={() => {
                router.back();
              }}
            >
              No
            </Button>
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default Signout;

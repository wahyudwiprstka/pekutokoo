"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Footerr from "../components/Footerr";

const ProfilePage = () => {
  const [user, setUser] = useState<any>({});
  const { data: session, status } = useSession();

  const getUser = async () => {
    if (status === "authenticated") {
      const res = await fetch(`/api/user/${session?.user?.id}`);
      const data = await res.json();
      setUser(data);
    }
  };

  useEffect(() => {
    getUser();
  }, [status]);
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-200">
        <Card className=" w-[80vw] md:w-[60vw] lg:w-[40vw] m-auto bg-white">
          <div className="flex items-center justify-center gap-10">
            <img src="/profile.jpg" className="rounded-full w-[200px] py-4" />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
              <p>({session?.user?.role})</p>
              <p>{user?.email}</p>
              <p>{user?.identity_number}</p>
              <a href="/change-password">
                <Button>Ubah Password</Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
      <Footerr />
    </>
  );
};

export default ProfilePage;

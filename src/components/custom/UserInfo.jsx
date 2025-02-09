"use client";

import Image from "next/image";

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex items-center">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={35}
          height={35}
          alt={`${session?.user?.name}'s profile picture`}
        />
      </div>
    );
  } 
}

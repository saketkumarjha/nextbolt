"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Colors } from "../../data/Colors";
import { ModeToggle } from "../../app/provider/ToggleTheme";
import UserInfo from "./UserInfo";

function Header() {
  const { status } = useSession();
  return (
    <div className="p-5 flex justify-between w-full ">
      <Image 
        src="/logo.png" 
        alt="logo" 
        width={40} height={40}
        priority
        className="w-10 h-10 object-contain"
      />
      <div className="gap-5 flex">
        <ModeToggle />
        
      {status === "authenticated" ? (
        <>
                <button
                onClick={() => signOut()}
                className="bg-slate-600 text-white px-4 py-1 rounded-md"
              >
                Sign Out
              </button>

        <UserInfo/>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-slate-900 text-white px-4 py-1 rounded-md"
          variant="ghost"
        >
          Sign In
        </button>
      )}
        <Button className="text-white" style={{ backgroundColor: "#2ba6ff" }} variant="ghost">
          Started
        </Button>
      </div>
    </div>
  );
}

export default Header;

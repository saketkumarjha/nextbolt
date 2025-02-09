"use client";
import React from "react";
import { useContext } from 'react';
import { useState } from "react";
import { ArrowRight, Link } from "lucide-react";
import Lookup from "../../data/Lookup";
import { MessagesContext } from '../../app/provider/MessagesProvider';
import { UserDetailContext } from '../../app/provider/UserDetailProvider';
import SignInDialog from "./SignInDialog";
import { signIn } from "next-auth/react";
function Hero() {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const onGenerate = (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    setMessages({ role: "user", content: input });
  };
  return (
    <div className="flex flex-col mt-36 xl:mt-35 items-center gap-2 ">
      <h1 className="font-bold text-4xl ">{Lookup.HERO_HEADING}</h1>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3 bg-transparent">
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(e) => setUserInput(e.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 text-white p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <Link className="h-5 w-5" />
      </div>
      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-2">
        {Lookup.SUGGSTIONS.map((sugestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(sugestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-yellow-200"
          >
            {sugestion}
          </h2>
        ))}
      </div>
      <SignInDialog
        signIn={signIn}
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;

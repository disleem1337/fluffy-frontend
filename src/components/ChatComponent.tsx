import React from "react";
import tw from "twin.macro";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { Button, BorderRadius, ButtonVariant } from "./Button/Button";

const ChatComponent = () => {
  return (
    <div tw="w-full p-4 bg-white mt-2 rounded-md flex flex-col gap-2 ">
      <div tw="flex flex-col w-full border-b">
        <h1 tw="font-semibold">Gökdeniz Çetin</h1>
        <p tw="font-light text-xs mb-3">Gökdeniz Çetin ile sohbet et</p>
      </div>
      <div tw="bg-gray-50 min-h-[300px] mt-2 p-4 flex flex-col gap-4">
        <div tw="flex gap-3 items-center">
          <img
            tw="w-10 h-10 border border-black rounded-full dark:border-gray-800 hover:scale-125 transition duration-300 ease-in-out"
            src={
              "https://flowbite.com/docs/images/people/profile-picture-4.jpg"
            }
            alt=""
          />
          <div tw="w-full bg-gray-100 text-black p-2 rounded-md text-sm">
            Merhaba bu bir test mesajıdır
          </div>
        </div>
        <div tw="flex gap-3 items-center">
          <div tw="w-full bg-gray-100 text-black p-2 rounded-md text-sm text-right">
            Merhaba bu bir test mesajıdır
          </div>
          <img
            tw="w-10 h-10 border border-black rounded-full dark:border-gray-800 hover:scale-125 transition duration-300 ease-in-out"
            src={
              "https://flowbite.com/docs/images/people/profile-picture-4.jpg"
            }
            alt=""
          />
        </div>
      </div>
      <div tw="py-4 px-2 bg-gray-50 flex gap-4 items-center">
        <BsFillChatLeftTextFill color="black" size={20} />
        <input
          type="text"
          tw="text-black text-sm p-2 w-full rounded-lg focus:outline-none"
        />
        <Button variant={ButtonVariant.GHOST}>
          <MdSend />
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;

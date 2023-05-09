import React from "react";
import tw from "twin.macro";

const ActiveUserChat = () => {
  const ProfilePic = [
    "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
  ];

  return (
    <div tw="w-full p-4 bg-white mt-4 flex justify-between items-center rounded-md">
      <div tw="flex flex-col">
        <h1 tw="font-semibold pb-1">Aktif Kullanıcılar</h1>
        <p tw="font-light text-xs">
          Fluffy üzerinden hızlı ve güvenli chat yapın!
        </p>
      </div>
      <div tw="flex  -space-x-4 items-center justify-center">
        {ProfilePic.map((item, index) => (
          <img
            tw="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 hover:scale-125 transition duration-300 ease-in-out"
            src={item}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveUserChat;

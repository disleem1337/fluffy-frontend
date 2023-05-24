import React from "react";
import tw from "twin.macro";
import { AiTwotoneLike } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { BsFillShareFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";

const NoficationsButton = ({ type, action, seen, active, message }: any) => {
  const types: any = {
    like: {
      type: "like",
      icon: <AiTwotoneLike color="white" />,
      title: "Yeni bir beğeni aldınız",
    },
    follow: {
      type: "follow",
      icon: <RiUserFollowFill color="white" />,
      title: "Yeni bir arkadaşlık isteği aldınız",
    },
    comment: {
      type: "comment",
      icon: <BsFillShareFill size={16} color="white" />,
      title: "Yeni bir yorum aldınız",
    },
  };

  const selectedType = types[type];

  return (
    <div
      tw="p-4 bg-white relative rounded-lg flex gap-3 items-center border-b shadow-sm"
      style={seen ? { opacity: 0.5 } : { opacity: 1 }}
    >
      {active ? (
        <div tw="absolute top-0 right-1 h-4 w-4 bg-black opacity-80 rounded-full flex justify-center items-center   -translate-y-1">
          <IoIosNotifications size={14} color="white" />
        </div>
      ) : null}
      <div tw="p-2 rounded-full h-8 w-8 bg-black">{selectedType.icon}</div>
      <div tw="flex flex-col ">
        <h1 tw="font-semibold ">{selectedType.title}</h1>
        <p tw="text-xs">{message}</p>
      </div>
    </div>
  );
};

export default NoficationsButton;

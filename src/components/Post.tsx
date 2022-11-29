import React from "react";
import tw from "twin.macro";
import { Profiletab } from "./Profiletab";
import Postimage from "../assets/post.png";
import { FcLike } from "react-icons/fc";
import { VscComment } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { BsShare } from "react-icons/bs";

const Post = () => {
  return (
    <div tw="flex flex-col px-8 py-4 bg-white rounded-lg  items-start">
      <Profiletab name="123...456" />
      <div>
        <p tw="text-sm max-w-xl leading-5">
          Was great meeting up with Anna Ferguson and Dave Bishop at the
          breafast talk! 🍕 #breakfast
        </p>
        <img src={Postimage} tw="w-full mt-4 " />
      </div>
      <div tw="flex mt-2 items-center justify-between w-full">
        <div tw="flex gap-8 items-center">
          <div tw="flex gap-2 items-center p-2 hover:bg-bgcolor rounded-lg">
            <FcLike size={24} />
            <p tw="text-sm">45</p>
          </div>
          <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
            <VscComment size={20} />
            <p tw="text-sm">45</p>
          </div>
          <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
            <FiShare size={20} />
          </div>
        </div>
        <div tw="flex gap-8 items-center">
          <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
            <BsShare size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

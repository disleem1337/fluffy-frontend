import NullAvatar from "../assets/nullavatar.png";
import React from "react";
import tw from "twin.macro";

type ProfiletabProps = {
  name: string;
};

export const Profiletab = ({ name }: ProfiletabProps) => {
  return (
    <div tw="flex items-center gap-3 py-2 px-1 rounded-xl hover:bg-bgcolor hover:cursor-pointer">
      <img src={NullAvatar} tw="w-8" />
      <p>{name}</p>
    </div>
  );
};

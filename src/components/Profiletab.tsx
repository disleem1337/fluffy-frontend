import NullAvatar from "../assets/nullavatar.png";
import React from "react";
import tw from "twin.macro";

type ProfiletabProps = {
  name: string;
};

export const Profiletab = ({ name }: ProfiletabProps) => {
  return (
    <div tw="flex items-center gap-3 py-2 px-1 rounded-xl hover:bg-bgcolor hover:cursor-pointer">
      <img
        src="https://www.arweave.net/01H1V-i5ikyQvXof2vXsdOMbOpjWkaj7L1QXkWRa3Io?ext=png"
        tw="w-8 rounded-full"
      />
      <p>{name}</p>
    </div>
  );
};

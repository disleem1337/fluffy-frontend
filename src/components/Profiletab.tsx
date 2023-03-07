import NullAvatar from "../assets/nullavatar.png";
import React from "react";
import tw from "twin.macro";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";

type ProfiletabProps = {
  name: string;
  full?: boolean;
};

export const Profiletab = ({ name, full }: ProfiletabProps) => {
  const { user } = useFluffyAuth();
  return (
    <div
      css={[
        tw`flex items-center gap-3 py-2 px-4 bg-white rounded-xl hover:cursor-pointer`,
        ,
        full && tw`flex-1`,
      ]}
    >
      <img
        src={
          user.profileImage ||
          "https://www.arweave.net/01H1V-i5ikyQvXof2vXsdOMbOpjWkaj7L1QXkWRa3Io?ext=png"
        }
        tw="w-8 rounded-full"
      />
      <p>{name}</p>
    </div>
  );
};

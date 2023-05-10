import NullAvatar from "../assets/nullavatar.png";
import React from "react";
import tw from "twin.macro";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { getImageWithFallback } from "../utils";

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
        src={getImageWithFallback(user.profileImage)}
        tw="w-8 h-8 object-cover rounded-full"
      />
      <p>{name}</p>
    </div>
  );
};

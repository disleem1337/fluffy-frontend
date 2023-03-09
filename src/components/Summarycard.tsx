import React from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import LoginSplash from "../assets/login-splash.jpg";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { Button, ButtonVariant, BorderRadius } from "./Button/Button";

export const SummaryCard = () => {
  const { user } = useFluffyAuth();
  return (
    <div tw="hidden md:flex flex-col rounded-md bg-white">
      {/* SummaryCard Banner Image */}
      <div tw="h-full w-full overflow-hidden rounded-md">
        <img src={LoginSplash} tw="w-full h-40 scale-150 object-cover " />
      </div>
      {/* SummaryCard Following Details */}
      <div tw="w-full h-full flex flex-row justify-around items-end p-2">
        <div tw="flex flex-col items-center">
          <p tw="text-lg font-semibold">1984</p>
          <p>Followers</p>
        </div>
        <div tw="flex flex-col items-center rounded-3xl bg-[#04060A] mt-[-50%] z-30">
          <img
            tw="w-full h-28 object-center rounded-3xl  p-1 object-cover "
            src={
              user.profileImage ||
              "https://www.arweave.net/01H1V-i5ikyQvXof2vXsdOMbOpjWkaj7L1QXkWRa3Io?ext=png"
            }
          />
        </div>
        <div tw="flex flex-col items-center">
          <p tw="text-lg font-semibold">1984</p>
          <p>Following</p>
        </div>
      </div>
      {/* Name And Details */}
      <div tw="w-full h-full flex-col flex items-center p-2">
        <h1 tw="text-xl font-semibold">
          {user.walletAddress.slice(0, 8) +
            "..." +
            user.walletAddress.slice(-8)}
        </h1>
        <p tw="text-sm">{user.username}</p>
      </div>
      {/* Description */}
      <div tw="w-full h-full flex-col flex items-center p-2 pb-4 text-center">
        <p tw="text-sm">
          ⭐Hello I'm Full Stack Web Developer.Open to the new projects{" "}
        </p>
      </div>
      <div tw="p-2 pb-2">
        <hr tw="h-0.5  w-full bg-black/50 border-0" />
      </div>
      <div tw="p-2 w-full">
        {/* <button tw="w-full bg-gray-200 p-2 text-gray-600">My Profile</button> */}
        <Link to="/profile">
          <Button
            variant={ButtonVariant.SECONDARY}
            borderRadius={BorderRadius.LARGE}
            tw="w-full py-6"
          >
            My Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tw from "twin.macro";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { getUser } from "../services/user";

const ProfileBanner = ({ userDetail }: any) => {
  return (
    <div tw="w-full ">
      <img
        tw="h-[250px] object-cover w-full"
        src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?cs=srgb&dl=pexels-thisisengineering-3861972.jpg&fm=jpg&w=1280&h=854&_gl=1*15jie78*_ga*MTE0NDU0NzU4Ny4xNjY1NjgyNjEw*_ga_8JE65Q40S6*MTY3MDg0MjkyNS4xMC4xLjE2NzA4NDI5NTIuMC4wLjA."
      />
      <div tw="flex gap-2 px-8 items-start">
        <div tw="h-24 w-[100px] rounded-full -translate-y-1/2 overflow-hidden ">
          <img
            tw="w-full h-full object-center object-cover"
            src={
              userDetail.profileImage ||
              "https://www.arweave.net/01H1V-i5ikyQvXof2vXsdOMbOpjWkaj7L1QXkWRa3Io?ext=png"
            }
          />
        </div>
        <div tw="p-2 mt-2 font-bold bg-[#808080] cursor-pointer rounded-md text-white ">
          {userDetail.walletAddress.slice(0, 8) +
            "..." +
            userDetail.walletAddress.slice(-8)}
        </div>
      </div>
    </div>
  ) as JSX.Element;
};

export default ProfileBanner;

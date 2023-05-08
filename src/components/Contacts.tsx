import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { Profiletab } from "./Profiletab";
import { BsLightning } from "react-icons/bs";
import { Button, BorderRadius, ButtonVariant } from "./Button/Button";
import { getAllUser } from "../services/user";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { Link } from "react-router-dom";

type ProfiletabProps = {
  title: string;
};

const Contacts = ({ title }: ProfiletabProps) => {
  const { token } = useFluffyAuth();
  const [userList, setuserList] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const userlists = await getAllUser(token as string);
      setuserList(userlists.data);
    })();
  }, []);

  return (
    <div tw="px-5 py-3 bg-white rounded-lg flex flex-col gap-2 mb-4 border-[1px]">
      <div>{title}</div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      {userList.map((user, index) => (
        <a key={index} href={`/profile/${user._id}`}>
          <div tw="w-full flex flex-col gap-2 h-full rounded-md p-2">
            <div tw="flex w-full gap-4 items-center">
              <img
                src={user.profileImage}
                tw="w-16 h-16 rounded-full border border-gray-600"
              />
              <div tw="flex flex-col ">
                <h1 tw="font-semibold">
                  {user.walletAddress.slice(0, 7)}...
                  {user.walletAddress.slice(-4)}
                </h1>
                <p tw="text-xs">Bu kişiyi takip et</p>
              </div>
            </div>
            <div tw="w-full">
              <Button
                borderRadius={BorderRadius.LARGE}
                variant={ButtonVariant.SECONDARY}
                tw="w-full py-4"
              >
                Takip Et
              </Button>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Contacts;

import React from "react";
import tw from "twin.macro";
import { Profiletab } from "./Profiletab";
import { BsLightning } from "react-icons/bs";
import { Button, BorderRadius, ButtonVariant } from "./Button/Button";

type ProfiletabProps = {
  title: string;
};

const Contacts = ({ title }: ProfiletabProps) => {
  const rows = [
    {
      id: 1,
      walletadres: "0xB9F6...112EF7",
      image: "https://i.pravatar.cc/150?img=1",
      desc: "Bu kişiyi takip et",
      icon: <BsLightning size={20} />,
    },
    {
      id: 2,
      walletadres: "0xB9F6...112EF7",
      image: "https://i.pravatar.cc/150?img=1",
      desc: "Bu kişiyi takip et",
      icon: <BsLightning size={20} />,
    },
    {
      id: 3,
      walletadres: "0xB9F6...112EF7",
      image: "https://i.pravatar.cc/150?img=1",
      desc: "Bu kişiyi takip et",
      icon: <BsLightning size={20} />,
    },
  ];

  return (
    <div tw="px-5 py-3 bg-white rounded-lg flex flex-col gap-2 mb-4">
      <div>{title}</div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      <div tw="w-full flex flex-col gap-2 h-full rounded-md bg-gray-100 p-2">
        <div tw="flex w-full gap-4 items-center">
          <img
            src="https://i.pravatar.cc/150?img=1"
            tw="max-h-14 rounded-full border border-gray-600"
          />
          <div tw="flex flex-col ">
            <h1 tw="font-semibold">0xB9F6...112EF7</h1>
            <p tw="text-xs">Bu kişiyi takip et</p>
          </div>
        </div>
        <div tw="w-full">
          <Button
            borderRadius={BorderRadius.LARGE}
            variant={ButtonVariant.SECONDARY}
            tw="w-full py-4"
          >
            Follow
          </Button>
        </div>
      </div>
      <div tw="w-full flex flex-col gap-2 h-full rounded-md bg-gray-100 p-2">
        <div tw="flex w-full gap-4 items-center">
          <img
            src="https://i.pravatar.cc/150?img=1"
            tw="max-h-14 rounded-full border border-gray-600"
          />
          <div tw="flex flex-col ">
            <h1 tw="font-semibold">0xB9F6...112EF7</h1>
            <p tw="text-xs">Bu kişiyi takip et</p>
          </div>
        </div>
        <div tw="w-full">
          <Button
            borderRadius={BorderRadius.LARGE}
            variant={ButtonVariant.SECONDARY}
            tw="w-full py-4"
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

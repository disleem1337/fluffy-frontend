import React from "react";
import tw from "twin.macro";
import NullAvatar from "../assets/nullavatar.png";
import { FcFlashOn } from "react-icons/fc";
import { BsImages, BsCameraVideo, BsHash } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { GoMention } from "react-icons/go";

const ShareTab: Array<{
  name: string;
  icon: React.ReactNode;
}> = [
  {
    name: "Image",
    icon: <BsImages size={20} color="#36628F" />,
  },
  {
    name: "Videos",
    icon: <BsCameraVideo size={18} color="#609E8A" />,
  },
  {
    name: "Attachment",
    icon: <ImAttachment size={18} color="#D7A985" />,
  },
  {
    name: "Hastag",
    icon: <BsHash size={18} color="#B24E60" />,
  },
  {
    name: "Uygulamalar",
    icon: <GoMention size={18} color="#A0A1A5" />,
  },
];

const Sharestatus = () => {
  return (
    <div tw="px-8 py-8 bg-white rounded-lg flex flex-col gap-4 items-center">
      <div tw="w-full grid grid-cols-8 gap-2">
        <div tw="col-span-1">
          <ShareBox />
        </div>
        <div tw="col-span-7">
          <div tw="relative w-full">
            <input
              type="text"
              tw="block w-full p-2 text-sm text-gray-900  border-gray-300 rounded-md bg-gray-50 outline-none"
              placeholder="Share something..."
            />
            <div tw="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none">
              <FcFlashOn size={22} />
            </div>
          </div>
        </div>
      </div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      <div tw=" justify-around w-full lg:flex">
        {ShareTab.map((item, index) => (
          <ShareTabItem name={item.name} icon={item.icon} key={index} />
        ))}
      </div>
    </div>
  );
};

const ShareBox = () => {
  return (
    <div tw="flex w-full justify-between items-center">
      <img tw="w-8" src={NullAvatar} />
    </div>
  );
};

type ShareTabItemProps = {
  name: string;
  icon: React.ReactNode;
};

const ShareTabItem = ({ name, icon }: ShareTabItemProps) => {
  return (
    <div tw="flex gap-2 p-4 rounded-xl hover:bg-bgcolor hover:cursor-pointer">
      {icon} <p tw="text-sm">{name}</p>
    </div>
  );
};

export default Sharestatus;

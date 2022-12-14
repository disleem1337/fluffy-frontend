import React from "react";
import tw from "twin.macro";
import {
  AiOutlineHome,
  AiOutlineNotification,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsChatDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import NullAvatar from "../assets/nullavatar.png";
import { Profiletab } from "./Profiletab";

const HeaderLink: Array<{
  id: number;
  name: string;
  link: string;
  icon: React.ReactNode;
  active: Boolean;
}> = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: <AiOutlineHome size={20} />,
    active: true,
  },
  {
    id: 2,
    name: "Bağlantılar",
    link: "/login",
    icon: <HiOutlineUserGroup size={18} />,
    active: false,
  },
  {
    id: 3,
    name: "Sohbetler",
    link: "/",
    icon: <BsChatDots size={18} />,
    active: false,
  },
  {
    id: 4,
    name: "Bildirimler",
    link: "/",
    icon: <AiOutlineNotification size={18} />,
    active: false,
  },
  {
    id: 5,
    name: "Uygulamalar",
    link: "/",
    icon: <AiOutlineAppstoreAdd size={18} />,
    active: false,
  },
];

const Header = () => {
  return (
    <div tw="h-[70px] px-4 md:px-14 grid grid-cols-4 items-center justify-between gap-8 bg-white w-full">
      <div tw="hidden md:flex gap-3 items-center">
        <h2 tw="font-bold text-2xl">Fluffy</h2>
        <div tw="relative w-full">
          <div tw="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              tw="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            tw="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 outline-none"
            placeholder="Ara"
          />
        </div>
      </div>
      <div tw="flex gap-3 justify-between col-span-4 md:col-span-2">
        {HeaderLink.map((link) => (
          <HeaderTab
            name={link.name}
            link={link.link}
            icon={link.icon}
            active={link.active}
            key={link.id}
          />
        ))}
      </div>
      <Link to="/profile" tw="hidden md:block">
        <div tw="md:flex items-center justify-end gap-3 hidden">
          <Profiletab full={false} name="0xB9F6...112EF7" />
        </div>
      </Link>
    </div>
  );
};

type HeaderTabProps = {
  name: string;
  link: string;
  icon: React.ReactNode;
  active: Boolean;
};

const HeaderTab = ({ name, link, icon, active }: HeaderTabProps) => {
  return (
    <Link to={link}>
      <div tw="flex flex-col md:flex-row gap-2 justify-center items-center w-full  ">
        <div>{icon}</div>
        <div
          tw="hidden md:block"
          css={[tw`text-sm`, active ? tw`font-extrabold` : tw`font-light`]}
        >
          {name}
        </div>
      </div>
    </Link>
  );
};

export default Header;

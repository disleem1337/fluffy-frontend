import React from "react";
import tw from "twin.macro";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineNotification,
  AiFillNotification,
  AiOutlineAppstoreAdd,
  AiFillAppstore,
} from "react-icons/ai";
import {
  RiHomeLine,
  RiHomeFill,
  RiUser3Line,
  RiUser3Fill,
  RiChat3Line,
  RiChat3Fill,
  RiNotification3Line,
  RiNotification3Fill,
  RiApps2Line,
  RiApps2Fill,
} from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { Profiletab } from "./Profiletab";
import { motion } from "framer-motion";

const HeaderLink: Array<{
  id: number;
  name: string;
  link?: string;
  icon: React.ReactNode;
  fillIcon?: React.ReactNode;
}> = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: <RiHomeLine size={24} />,
    fillIcon: <RiHomeFill size={24} />,
  },
  {
    id: 2,
    name: "Bağlantılar",
    link: "/profile",
    icon: <RiUser3Line size={24} />,
    fillIcon: <RiUser3Fill size={24} />,
  },
  {
    id: 3,
    name: "Sohbetler",
    link: "/chat",
    icon: <RiChat3Line size={24} />,
    fillIcon: <RiChat3Fill size={24} />,
  },
  {
    id: 4,
    name: "Bildirimler",
    icon: <RiNotification3Line size={24} />,
    fillIcon: <RiNotification3Fill size={24} />,
  },
  {
    id: 5,
    name: "Uygulamalar",
    link: "/apps",
    icon: <RiApps2Line size={24} />,
    fillIcon: <RiApps2Fill size={24} />,
  },
];

const Header = () => {
  return (
    <div tw="h-[70px] px-4 max-w-[1440px] mx-auto grid grid-cols-4 items-center justify-between gap-8 w-full">
      <div tw="hidden md:flex gap-3 items-center">
        <h2 tw="font-bold text-2xl">Fluffy</h2>
        <div tw="relative w-full focus-within:text-black text-gray-600">
          <div tw="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              tw="w-4 h-4"
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
            tw="block w-full p-2 pl-10 text-sm text-gray-900 rounded-md border-gray-300 border bg-white focus:border-black outline-none"
            placeholder="Ara"
          />
        </div>
      </div>
      <div tw="flex gap-12 justify-center col-span-4 md:col-span-2">
        {HeaderLink.map((link) =>
          link.link ? (
            <HeaderTab
              name={link.name}
              link={link.link}
              icon={link.icon}
              key={link.id}
              fillIcon={link.fillIcon}
            />
          ) : (
            <span>Ah lan</span>
          )
        )}
      </div>

      <div tw="md:flex items-center justify-end gap-3 hidden">
        <Link to="/profile" tw="hidden md:block">
          <Profiletab full={false} name="0xB9F6...112EF7" />
        </Link>
      </div>
    </div>
  );
};

type HeaderTabProps = {
  name: string;
  link: string;
  icon: React.ReactNode;
  fillIcon?: React.ReactNode;
};

const HeaderTab = ({ name, link, icon, fillIcon }: HeaderTabProps) => {
  console.log(link);
  return (
    <NavLink to={link}>
      {({ isActive }) => {
        console.log(link, isActive);
        return (
          <div tw="flex flex-col md:flex-row gap-2 justify-center items-center w-full relative">
            <div>{isActive && fillIcon ? fillIcon : icon}</div>
            <div tw="absolute top-6 left-1/2 -translate-x-1/2">
              {isActive && (
                <motion.div
                  layoutId="header-blob"
                  tw="w-2 h-2 bg-black rounded-full"
                ></motion.div>
              )}
            </div>
          </div>
        );
      }}
    </NavLink>
  );
};

export default Header;

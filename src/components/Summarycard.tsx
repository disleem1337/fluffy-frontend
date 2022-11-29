import React from "react";
import tw from "twin.macro";
import { Profiletab } from "./Profiletab";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiLinkAlt } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { GrApps, GrBitcoin } from "react-icons/gr";

const Tabs: Array<{
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}> = [
  {
    id: 1,
    icon: <BiLinkAlt color="#1877F2" size={36} />,
    title: "Fluffy App",
    description: "lorem ipsum sit dolar amet",
  },
  {
    id: 2,
    icon: <AiOutlineAppstoreAdd color="#C74F35" size={36} />,
    title: "Fluffy App",
    description: "lorem ipsum sit dolar amet",
  },
  {
    id: 3,
    icon: <GrApps size={36} />,
    title: "Fluffy App",
    description: "lorem ipsum sit dolar amet",
  },
];

const Coin: Array<{
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}> = [
  {
    id: 1,
    icon: <GrBitcoin color="#F0B90B" size={36} />,
    title: "Fluffy Coin",
    description: "lorem ipsum sit dolar amet",
  },
];

export const SummaryCard = () => {
  return (
    <div tw="px-5 py-3 bg-white rounded-lg flex flex-col gap-2">
      <div tw="flex items-center justify-between w-full">
        <Profiletab name="123...456" />
        <FiSettings size={24} />
      </div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      <h1 tw="w-full text-gray-300 py-2">Your Pages</h1>
      <div tw="flex w-full flex-col gap-4">
        {Tabs.map((tab) => (
          <Tab
            key={tab.id}
            icon={tab.icon}
            title={tab.title}
            description={tab.description}
          />
        ))}
      </div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      <h1 tw="w-full text-gray-300 py-2">Platform Coin</h1>
      <div tw="flex w-full flex-col gap-4">
        {Coin.map((tab) => (
          <Tab
            key={tab.id}
            icon={tab.icon}
            title={tab.title}
            description={tab.description}
          />
        ))}
      </div>
      <div tw="py-2 text-sm text-blue-600">
        <Link to="/login">View All</Link>
      </div>
    </div>
  );
};

type TabProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};
const Tab = ({ icon, title, description }: TabProps) => {
  return (
    <div tw="flex items-center justify-between w-full">
      <div tw="flex gap-3 items-center rounded-xl hover:bg-bgcolor hover:cursor-pointer w-full p-2">
        <div>{icon}</div>
        <div>
          <h1>{title}</h1>
          <p tw="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

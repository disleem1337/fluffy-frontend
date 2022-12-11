import React from "react";
import tw from "twin.macro";
import { Profiletab } from "./Profiletab";
import { BsLightning } from "react-icons/bs";

type ProfiletabProps = {
  title: string;
};

const Contacts = ({ title }: ProfiletabProps) => {
  const rows = [
    {
      id: 1,
      component: <Profiletab name="123...456" />,
      icon: <BsLightning size={20} />,
    },
    {
      id: 2,
      component: <Profiletab name="123...456" />,
      icon: <BsLightning size={20} />,
    },
    {
      id: 3,
      component: <Profiletab name="123...456" />,
      icon: <BsLightning size={20} />,
    },
  ];

  return (
    <div tw="px-5 py-3 bg-white rounded-lg flex flex-col gap-2 mb-4">
      <div>{title}</div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      {rows.map((row) => (
        <div tw="flex justify-between items-center">
          <div tw="flex-1" key={row.id}>
            {row.component}
          </div>
          <div tw="p-4 rounded-lg hover:bg-bgcolor">{row.icon}</div>
        </div>
      ))}
      <p tw="w-full text-center cursor-pointer text-blue-500">Daha Fazla Gör</p>
    </div>
  );
};

export default Contacts;

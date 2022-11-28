import React from "react";
import Header from "../components/Header";
import "twin.macro";

type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div tw="h-screen bg-bgcolor ">
      <Header />
      {children}
    </div>
  );
};

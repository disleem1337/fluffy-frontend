import React from "react";
import Header from "../components/Header";
import "twin.macro";

type BaseLayoutProps = {
	children: React.ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<div tw="h-full bg-[#F4F4F4] ">
			<Header />
			<div tw="max-w-[1440px] mx-auto p-4">{children}</div>
		</div>
	);
};

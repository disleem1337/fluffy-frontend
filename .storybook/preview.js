import React from "react";
import GlobalStyles from "../src/styles/GlobalStyles";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	backgrounds: {
		default: "white",
		values: [
			{
				name: "white",
				value: "#fff",
			},
		],
	},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	(Story) => (
		<>
			<GlobalStyles />
			<Story />
		</>
	),
];

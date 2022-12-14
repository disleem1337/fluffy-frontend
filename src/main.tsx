import React from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";
import FluffyWeb3Provider from "./providers/fluffyWeb3Provider";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<>
		<GlobalStyles />
		<FluffyWeb3Provider>
			<App />
		</FluffyWeb3Provider>
	</>
);

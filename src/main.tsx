import React from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles/GlobalStyles";
import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";
import Login from "./pages/login";
import App from "./App";

const router = createBrowserRouter([
	{
	  path: "/",
	  element:<App/>
	},
	{
	  path: "/login",
	  element:<Login/>
	}
  ]);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<GlobalStyles />
		<RouterProvider router={router} />
	</React.StrictMode>
);

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/Login";
import Fluffy from "./pages/Fluffy";
import Settings from "./pages/Settings";
import "twin.macro";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { metaMask, hooks } from "./connectors/metamask";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Fluffy />
			</ProtectedRoute>
		),
	},
	{
		path: "/login",
		element: (
			<GuestRoute>
				<LoginPage />
			</GuestRoute>
		),
	},
	{
		path: "/profile",
		element: (
			<ProtectedRoute>
				<Settings />
			</ProtectedRoute>
		),
	},
]);

function App() {
	const provider = hooks.useProvider();

	return (
		<div tw="font-sans">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;

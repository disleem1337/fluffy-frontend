import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Fluffy from "./pages/Fluffy";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Fluffy />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);

function App() {
	return (
		<div tw="">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;

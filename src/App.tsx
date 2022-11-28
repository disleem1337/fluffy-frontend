import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Fluffy from "./pages/Fluffy";
import "twin.macro";

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
    <div tw="font-sans">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

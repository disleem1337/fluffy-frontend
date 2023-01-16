import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/Login";
import Fluffy from "./pages/Fluffy";
import Settings from "./pages/Settings";
import "twin.macro";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { metaMask, hooks } from "./connectors/metamask";
import Chat from "./pages/Chat";
import Apps from "./pages/Apps";
import Setup from "./pages/Setup";
import OnlyNotSetupRoute from "./components/OnlyNotSetupRoute";
import OnlySetupRoute from "./components/OnlySetupRoute";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <OnlySetupRoute>
          <Fluffy />
        </OnlySetupRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/setup",
    element: (
      <ProtectedRoute>
        <OnlyNotSetupRoute>
          <Setup />
        </OnlyNotSetupRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <OnlySetupRoute>
          <Chat />
        </OnlySetupRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/apps",
    element: (
      <ProtectedRoute>
        <OnlySetupRoute>
          <Apps />
        </OnlySetupRoute>
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
        <OnlySetupRoute>
          <Settings />
        </OnlySetupRoute>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div tw="font-sans">
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;

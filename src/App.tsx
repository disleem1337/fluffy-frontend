import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
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
import PostPage from "./pages/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <OnlySetupRoute>
          <HomePage />
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
  {
    path: "/post/:id",
    element: (
      <ProtectedRoute>
        <OnlySetupRoute>
          <PostPage />
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

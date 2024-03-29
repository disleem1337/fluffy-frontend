import { Navigate } from "react-router-dom";
import React from "react";
import Loading from "../pages/Loading";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useFluffyAuth();

  if (isConnected == null) {
    return <Loading />;
  }

  if (isConnected) {
    return <Navigate replace={true} to="/" />;
  }

  return <>{children}</>;
}

export default GuestRoute;

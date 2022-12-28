import { Navigate } from "react-router-dom";
import React from "react";
import { useFluffyWeb3 } from "../providers/fluffyWeb3Provider";
import Loading from "../pages/Loading";

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useFluffyWeb3();

  if (isConnected == null) {
    return <Loading />;
  }

  if (isConnected) {
    return <Navigate replace={true} to="/" />;
  }

  return <>{children}</>;
}

export default GuestRoute;

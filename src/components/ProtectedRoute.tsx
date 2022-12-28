import { Navigate } from "react-router-dom";
import { useFluffyWeb3 } from "../providers/fluffyWeb3Provider";
import React from "react";
import Loading from "../pages/Loading";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useFluffyWeb3();

  if (isConnected == null) {
    return <Loading />;
  }

  if (isConnected == false) {
    return <Navigate replace={true} to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

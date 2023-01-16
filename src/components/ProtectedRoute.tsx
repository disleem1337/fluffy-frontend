import { Navigate } from "react-router-dom";
import React from "react";
import Loading from "../pages/Loading";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useFluffyAuth();

  if (isConnected == null) {
    return <Loading />;
  }

  if (isConnected == false) {
    return <Navigate replace={true} to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import React from "react";
import Loading from "../pages/Loading";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";

function OnlySetupRoute({ children }: { children: React.ReactNode }) {
  const { user } = useFluffyAuth();

  if (!user.setup) {
    return <Navigate replace={true} to="/setup" />;
  }

  return <>{children}</>;
}

export default OnlySetupRoute;

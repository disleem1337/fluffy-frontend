import { Navigate } from "react-router-dom";
import React from "react";
import { useFluffyWeb3 } from "../providers/fluffyWeb3Provider";

function GuestRoute({ children }: { children: React.ReactNode }) {
	const { isConnected } = useFluffyWeb3();

	if (isConnected == null) {
		return <h1>Loading...</h1>;
	}

	if (isConnected) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
}

export default GuestRoute;

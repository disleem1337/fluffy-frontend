import { Navigate } from "react-router-dom";
import React from "react";
import useAuthStore from "../stores/auth";

function GuestRoute({ children }: { children: React.ReactNode }) {
	const isAuth = useAuthStore((store) => store.auth);

	if (isAuth == null) {
		return <h1>Loading...</h1>;
	}

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
}

export default GuestRoute;

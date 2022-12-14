import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/auth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const isAuth = useAuthStore((store) => store.auth);

	if (isAuth == null) {
		return <h1>Loading...</h1>;
	}

	if (isAuth == false) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
}

export default ProtectedRoute;

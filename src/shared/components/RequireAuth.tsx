import { useLocation, Navigate, Outlet, Location } from "react-router-dom";
import useAuth from "../../features/auth/hooks/useAuth.tsx";
import Role from "../const/Role.ts";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location: Location = useLocation();

  if (!auth?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRequiredRole =
    auth?.roles?.length === 0 ||
    auth?.roles?.some((role: number) => role === Role.User);

  if (hasRequiredRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

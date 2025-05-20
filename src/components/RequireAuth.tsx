import { useLocation, Navigate, Outlet, Location } from "react-router-dom";
import useAuth from "../hooks/useAuth";

enum Role {
  User = 1000,
}

const allowedRoles: number[] = [Role.User];

const RequireAuth = () => {
  const { auth } = useAuth();
  const location: Location = useLocation();

  if (!auth?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRequiredRole =
    auth?.roles?.length === 0 ||
    auth?.roles?.some((role: number) => allowedRoles.includes(role));

  if (hasRequiredRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

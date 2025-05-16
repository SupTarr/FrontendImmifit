import { useLocation, Navigate, Outlet, Location } from "react-router-dom";
import useAuth from "../hooks/useAuth";

enum Role {
  User = 1000,
}

const allowedRoles: number[] = [Role.User];

const RequireAuth = (): JSX.Element => {
  const { auth } = useAuth();
  const location: Location = useLocation();

  if (auth?.roles?.find((role: number) => allowedRoles?.includes(role))) {
    return <Outlet />;
  }  else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

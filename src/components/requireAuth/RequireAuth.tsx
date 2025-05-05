import { useLocation, Navigate, Outlet, Location } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps): JSX.Element => {
  const { auth } = useAuth();
  const location: Location = useLocation();
  console.log(auth);
  console.log(location);
  const userHasRequiredRole = auth?.roles?.find((role: string) =>
    allowedRoles?.includes(role),
  );

  if (userHasRequiredRole) {
    return <Outlet />;
  } else if (auth?.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

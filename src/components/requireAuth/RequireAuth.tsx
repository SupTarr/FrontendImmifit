import React from "react";
import { useLocation, Navigate, Outlet, Location } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthState } from "../../context/AuthProvider";

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps): JSX.Element => {
  const { auth } = useAuth();
  const location: Location = useLocation();
  
  console.log(auth);
  console.log(location);
  
  // Check if user has required role
  const userHasRequiredRole = auth?.roles?.find((role: string) => 
    allowedRoles?.includes(role)
  );

  // Render based on authentication and role status
  if (userHasRequiredRole) {
    return <Outlet />;
  } else if (auth?.user) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    // User is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;


import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { AuthContextType, AuthState } from "../models/Auth";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId?: string;
  username?: string;
  email?: string;
  roles?: number[];
  sub?: string;
  exp?: number;
}

const useAuth = (): AuthContextType => {
  const context = useContext<AuthContextType>(AuthContext);
  const { auth, setAuth } = context;

  useEffect(() => {
    if (!auth.accessToken) return;

    try {
      const decodedToken: DecodedToken = jwtDecode(auth.accessToken);
      const updatedAuth: AuthState = {
        ...auth,
        userId: decodedToken.userId || auth.userId,
        username: decodedToken.username || auth.username,
        email: decodedToken.email || auth.email,
        roles: decodedToken.roles || auth.roles,
      };

      setAuth(updatedAuth);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }, [auth.accessToken]);

  return context;
};

export default useAuth;

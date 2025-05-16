import { useContext, useEffect } from "react";
import AuthContext, {
  AuthContextType,
  AuthState,
} from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId?: string;
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
        roles: decodedToken.roles || auth.roles,
      };

      setAuth(updatedAuth);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.warn("Token has expired");
        // You might want to trigger a token refresh here
      }
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }, [auth.accessToken]);

  return context;
};

export default useAuth;

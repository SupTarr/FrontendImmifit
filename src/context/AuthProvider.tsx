import { createContext, useState, ReactNode } from "react";
import { AuthState, AuthContextType } from "../models/Auth";

const AuthContext = createContext<AuthContextType>({
  auth: {
    userId: null,
    username: null,
    email: null,
    roles: [],
    accessToken: null,
  },
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (e) {
        console.error("Failed to parse stored auth data", e);
      }
    }

    return {
      userId: null,
      username: null,
      email: null,
      roles: [],
      accessToken: null,
    };
  });

  const updateAuth = (newAuthData: Partial<AuthState>) => {
    const updatedAuth = { ...auth, ...newAuthData };
    setAuth(updatedAuth);

    if (updatedAuth.accessToken) {
      localStorage.setItem("authData", JSON.stringify(updatedAuth));
    } else {
      localStorage.removeItem("authData");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

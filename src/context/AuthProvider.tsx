import { createContext, useState, ReactNode } from "react";

export interface AuthState {
  userId?: string | null;
  username?: string | null;
  email?: string | null;
  roles?: number[];
  accessToken?: string | null;
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

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

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
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

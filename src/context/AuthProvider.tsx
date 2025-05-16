import { createContext, useState, ReactNode } from "react";

export interface AuthState {
  userId?: string | null;
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
    roles: [],
    accessToken: null,
  },
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [auth, setAuth] = useState<AuthState>({
    userId: null,
    roles: [],
    accessToken: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

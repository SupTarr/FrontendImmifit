import { createContext, useState, ReactNode } from "react";

// Define the auth state interface
export interface AuthState {
  user?: string;
  accessToken?: string;
  roles?: string[];
  [key: string]: any; // Allow for additional properties
}

// Define the auth context interface
export interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

// Create the context with a default empty value
const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [auth, setAuth] = useState<AuthState>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


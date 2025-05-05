import { useContext, useDebugValue } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";

const useAuth = (): AuthContextType => {
  const { auth } = useContext<AuthContextType>(AuthContext);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useContext<AuthContextType>(AuthContext);
};

export default useAuth;

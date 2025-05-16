import axiosInstance from "../api/axios.js";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAuth({
        userId: null,
        roles: [],
        accessToken: null,
      });
    }
  };

  return logout;
};

export default useLogout;

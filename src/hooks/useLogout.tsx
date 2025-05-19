import axiosInstance from "../api/axios.js";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("authData");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAuth({
        userId: null,
        username: null,
        email: null,
        roles: [],
        accessToken: null,
      });

      window.location.reload();
    }
  };

  return logout;
};

export default useLogout;

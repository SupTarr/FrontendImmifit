import axiosInstance from "../api/axios.js";
import { AxiosResponse } from "axios";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";

interface RefreshResponse {
  body: {
    accessToken: string;
  };
}

interface DecodedToken {
  userId?: string;
  roles?: number[];
  sub?: string;
  exp?: number;
}

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async (): Promise<string | null> => {
    try {
      const response: AxiosResponse<RefreshResponse> =
        await axiosInstance.post("/auth/refresh");

      const newToken = response.data.body.accessToken;
      if (!newToken) {
        console.error("Refresh token request did not return an access token");
        return null;
      }

      try {
        const decodedToken: DecodedToken = jwtDecode(newToken);

        setAuth({
          ...auth,
          accessToken: newToken,
          userId: decodedToken.userId || auth.userId,
          roles: decodedToken.roles || auth.roles,
        });

        console.log("Token refreshed successfully");
        return newToken;
      } catch (decodeError) {
        console.error("Error decoding refreshed token:", decodeError);
        return newToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      setAuth({
        userId: null,
        roles: [],
        accessToken: null,
      });

      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;

import axios from "../api/axios";
import { AxiosResponse } from "axios";
import useAuth from "./useAuth";
import { AuthState } from "../context/AuthProvider";

interface RefreshResponse {
  accessToken: string;
}

const useRefreshToken = (): () => Promise<string> => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const response: AxiosResponse<RefreshResponse> = await axios.get("/refresh", {
      withCredentials: true,
    });
    
    setAuth((prev: AuthState) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    
    return response.data.accessToken;
  };
  
  return refresh;
};

export default useRefreshToken;


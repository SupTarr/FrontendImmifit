import axiosInstance from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const useAxiosPrivate = (): AxiosInstance => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (!config.headers) {
          config.headers = {};
        }

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError): Promise<any> => {
        const prevRequest = error?.config as ExtendedAxiosRequestConfig;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken: string | undefined = await refresh();
          if (!prevRequest.headers) {
            prevRequest.headers = {};
          }

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosInstance;
};

export default useAxiosPrivate;

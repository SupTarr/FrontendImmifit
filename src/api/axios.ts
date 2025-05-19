import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

const defaultConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create(defaultConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    const authDataString = localStorage.getItem("authData");
    if (!authDataString) {
      return config;
    }

    try {
      const authData = JSON.parse(authDataString);
      const token = authData?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to parse authData from localStorage", error);
      localStorage.removeItem("authData");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

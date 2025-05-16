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
export default axiosInstance;

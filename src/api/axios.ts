import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL: string = "https://immifit-backend.suptarr.vercel.app/";

const defaultConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,

  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://immifit.vercel.app/",
  },
  withCredentials: true,
};

const privateConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create(defaultConfig);

export const axiosPrivate: AxiosInstance = axios.create(privateConfig);

export default axiosInstance;

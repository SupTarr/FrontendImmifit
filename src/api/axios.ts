import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL: string = "https://immifit-backend.vercel.app/";

const defaultConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": 'http://127.0.0.1:5173,https://immifit.vercel.app/',
    "Content-Type": "application/json",
  },
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


import axios from "axios";
const BASE_URL = "https://immifit-backend.vercel.app/";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin":
      /*['http://127.0.0.1:5173', 'https://immifit.vercel.app/']*/ "*",
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

import axiosInstance from "./axios";
import { InternalAxiosRequestConfig } from "axios";

interface QueuedRequest {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  request: InternalAxiosRequestConfig;
}

export const setupAxiosInterceptors = (
  refresh: () => Promise<string | null>,
) => {
  let refreshing = false;
  const requestsQueue: QueuedRequest[] = [];

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status !== 400 && originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      if (refreshing) {
        return new Promise((resolve, reject) => {
          requestsQueue.push({ resolve, reject, request: originalRequest });
        });
      }

      refreshing = true;
      try {
        const newToken = await refresh();
        if (!newToken) {
          requestsQueue.forEach(({ reject }) =>
            reject(new Error("Token refresh failed to return a new token.")),
          );

          requestsQueue.length = 0;
          return Promise.reject(
            new Error("Token refresh failed to return a new token."),
          );
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        requestsQueue.forEach(({ resolve, reject, request }) => {
          request.headers.Authorization = `Bearer ${newToken}`;
          axiosInstance(request).then(resolve).catch(reject);
        });

        requestsQueue.length = 0;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        requestsQueue.forEach(({ reject }) => reject(refreshError));
        requestsQueue.length = 0;
        return Promise.reject(refreshError);
      } finally {
        refreshing = false;
      }
    },
  );
};

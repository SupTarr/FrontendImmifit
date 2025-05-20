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
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (refreshing) {
        return new Promise((resolve, reject) => {
          requestsQueue.push({ resolve, reject, request: originalRequest });
        });
      }

      originalRequest._retry = true;
      refreshing = true;

      try {
        const newToken = await refresh();
        if (!newToken) {
          requestsQueue.forEach(({ reject: qReject }) =>
            qReject(new Error("Token refresh failed to return a new token.")),
          );

          requestsQueue.length = 0;
          return Promise.reject(
            new Error("Token refresh failed to return a new token."),
          );
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        requestsQueue.forEach(
          ({ resolve: qResolve, reject: qReject, request: qRequest }) => {
            if (qRequest.headers) {
              qRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            axiosInstance(qRequest).then(qResolve).catch(qReject);
          },
        );

        requestsQueue.length = 0;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        requestsQueue.forEach(({ reject: qReject }) => qReject(refreshError));
        requestsQueue.length = 0;
        return Promise.reject(refreshError);
      } finally {
        refreshing = false;
      }
    },
  );
};

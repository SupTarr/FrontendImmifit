import { axiosInstance } from "./axios";
import { LoginRequest, LoginResponse } from "../models/Login";
import { RegisterRequest, RegisterResponse } from "../models/Register";

/**
 * Sends a login request to the backend API.
 *
 * @param data - The login credentials (email and password).
 * @typeParam LoginRequest - The type definition for the login request payload.
 * @typeParam LoginResponse - The type definition for the expected response.
 * @returns A promise that resolves with the login response data.
 * @throws Throws an error if the API request fails.
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  // Makes a POST request to the "/auth/login" endpoint with the provided data.
  const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
  // Returns the data part of the response, which should conform to LoginResponse.
  return response.data;
};

/**
 * Sends a registration request to the backend API.
 *
 * @param data - The registration details (email, username, and password).
 * @typeParam RegisterRequest - The type definition for the registration request payload.
 * @typeParam RegisterResponse - The type definition for the expected response.
 * @returns A promise that resolves with the registration response data.
 * @throws Throws an error if the API request fails.
 */
export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  // Makes a POST request to the "/auth/register" endpoint with the provided data.
  const response = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    data
  );
  // Returns the data part of the response, which should conform to RegisterResponse.
  return response.data;
};

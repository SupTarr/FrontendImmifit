import { axiosInstance } from "./axios";
import { ProfileState, ProfileResponse } from "../models/Profile";

/**
 * Fetches the user's profile data from the backend API.
 *
 * @typeParam ProfileResponse - The type definition for the expected response.
 * @returns A promise that resolves with the profile response data.
 * @throws Throws an error if the API request fails.
 */
export const getProfile = async (): Promise<ProfileResponse> => {
  // Makes a GET request to the "/users" endpoint.
  // This endpoint was changed from "/profile" as per previous refactoring.
  const response = await axiosInstance.get<ProfileResponse>("/users");
  // Returns the data part of the response.
  return response.data;
};

/**
 * Updates the user's profile data on the backend API.
 * This function handles sending profile data, including a potential image file,
 * as multipart/form-data.
 *
 * @param profileData - An object containing partial or full profile state to be updated.
 * @param file - A Blob representing the new profile image, or null if the image is not being updated.
 * @typeParam ProfileState - The type definition for the user's profile data.
 * @typeParam ProfileResponse - The type definition for the expected response.
 * @returns A promise that resolves with the updated profile response data.
 * @throws Throws an error if the API request fails.
 */
export const updateProfile = async (
  profileData: Partial<ProfileState>, // Allows sending only the fields that need updating.
  file: Blob | null // The new image file, or null.
): Promise<ProfileResponse> => {
  // Create a new FormData object to build the multipart request payload.
  const formData = new FormData();

  // Append profile data fields to the FormData.
  // These fields are mirrored from the logic previously in ProfileProvider.tsx.
  // Fallback to empty strings if values are null or undefined, ensuring fields are present.
  formData.append("about", profileData.about || "");
  formData.append("gender", profileData.gender?.toString() || "");
  formData.append("age", profileData.age?.toString() || "");
  formData.append("weight", profileData.weight?.toString() || "");
  formData.append("height", profileData.height?.toString() || "");

  // Handle file upload if a file is provided.
  if (file) {
    // Append imageId if it exists in profileData.
    // The backend might use imageId to replace an existing image or link a new one.
    // The logic ensures imageId is a string, defaulting to an empty string if not present,
    // based on previous implementation patterns.
    if (profileData.image && profileData.image.id !== null && profileData.image.id !== undefined) {
      formData.append("imageId", profileData.image.id.toString());
    } else {
      // If no existing imageId, send an empty string. Backend should handle this.
      formData.append("imageId", "");
    }
    // Append the actual file data. A random UUID is used for the filename.
    formData.append("file", file, `${crypto.randomUUID()}.png`);
  }

  // Makes a POST request to the "/users" endpoint with the FormData.
  // This endpoint and method (POST instead of PUT) were changed based on previous refactoring.
  // Axios automatically sets 'Content-Type': 'multipart/form-data' when FormData is used.
  // However, explicitly setting it (as was done in ProfileProvider) is also fine.
  const response = await axiosInstance.post<ProfileResponse>(
    "/users",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Explicitly set, though often optional with FormData
      },
    }
  );
  // Returns the data part of the response.
  return response.data;
};

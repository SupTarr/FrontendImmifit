import { useContext } from "react";
import axiosInstance from "../../../shared/api/axios.js";
import AuthContext from "../../auth/context/AuthProvider";
import { ProfileState } from "../types/Profile";

export const useProfileApi = () => {
  const { auth } = useContext(AuthContext);

  const fetchProfile = async () => {
    if (!auth?.accessToken) {
      return null;
    }

    try {
      const response = await axiosInstance.get("/profile");
      return response.data.body;
    } catch (err) {
      console.error("Error fetching profile data", err);
      throw new Error("Failed to fetch profile data");
    }
  };

  const updateProfile = async (
    profileData: Partial<ProfileState>,
    imageFile: Blob | null,
  ) => {
    if (!auth?.accessToken) {
      return null;
    }

    const formData = new FormData();
    formData.append("about", profileData.about || "");
    formData.append("gender", profileData.gender?.toString() || "");
    formData.append("age", profileData.age?.toString() || "");
    formData.append("weight", profileData.weight?.toString() || "");
    formData.append("height", profileData.height?.toString() || "");
    if (imageFile) {
      formData.append("imageId", profileData.image?.id || "");
      formData.append("imageFile", imageFile, `${crypto.randomUUID()}.png`);
    }

    try {
      const response = await axiosInstance.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.body;
    } catch (err) {
      console.error("Error updating profile data", err);
      throw new Error("Failed to update profile data");
    }
  };

  return {
    fetchProfile,
    updateProfile,
  };
};

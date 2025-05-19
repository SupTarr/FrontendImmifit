import { useReducer, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import TextareaInput from "../components/TextareaInput.tsx";
import NumberInput from "../components/NumberInput.tsx";
import SelectInput from "../components/SelectInput.tsx";
import Button from "../components/Button.tsx";
import Alert from "../components/Alert.tsx";
import ImageInput from "../components/ImageInput.tsx";
import { Home } from "../const/Links.ts";
import axiosInstance from "../api/axios.js";
import useProfile from "../hooks/useProfile.tsx";
import { Success } from "../const/Status.ts";

type ProfileFormAction =
  | { type: "setAbout"; about: string | null }
  | { type: "setGender"; gender: number | null }
  | { type: "setAge"; age: number | null }
  | { type: "setWeight"; weight: number | null }
  | { type: "setHeight"; height: number | null }
  | { type: "updateProfile"; profile: any }
  | {
      type: "setHandleSubmit";
      isLoading: boolean;
      errorMessage: string | null;
    };

type ProfileFormState = {
  about: string | null;
  gender: number | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  imageUrl: string | null;
  isLoading: boolean;
  errorMessage: string | null;
};

const ProfileFormContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || Home;
  const { profile, refreshProfile } = useProfile();
  const [profileImageBlob, setProfileImageBlob] = useState<Blob | null>(null);

  const [state, dispatch] = useReducer(
    (state: ProfileFormState, action: ProfileFormAction): ProfileFormState => {
      switch (action.type) {
        case "setAbout":
          return { ...state, about: action.about };
        case "setGender":
          return { ...state, gender: action.gender };
        case "setAge":
          return { ...state, age: action.age };
        case "setWeight":
          return { ...state, weight: action.weight };
        case "setHeight":
          return { ...state, height: action.height };
        case "updateProfile":
          return {
            ...state,
            about: action.profile?.about || null,
            gender: action.profile?.gender || null,
            age: action.profile?.age || null,
            weight: action.profile?.weight || null,
            height: action.profile?.height || null,
            imageUrl: action.profile?.imageUrl || null,
          };
        case "setHandleSubmit":
          return {
            ...state,
            isLoading: action.isLoading,
            errorMessage: action.errorMessage,
          };
        default:
          return state;
      }
    },
    {
      about: null,
      gender: null,
      age: null,
      weight: null,
      height: null,
      isLoading: false,
      errorMessage: null,
      imageUrl: null,
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    dispatch({ type: "setHandleSubmit", isLoading: true, errorMessage: null });
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("about", state.about || "");
      formData.append("gender", state.gender?.toString() || "");
      formData.append("age", state.age?.toString() || "");
      formData.append("weight", state.weight?.toString() || "");
      formData.append("height", state.height?.toString() || "");
      if (profileImageBlob) {
        formData.append("profileImage", profileImageBlob, "profile-image.jpg");
      }

      const response: AxiosResponse = await axiosInstance.post(
        "/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.status !== Success) {
        throw new Error("Edit profile failed");
      }

      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage: null,
      });

      refreshProfile();
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as AxiosError<any>;
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage:
          error?.response?.data?.message ||
          "Update profile failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (profile) {
      dispatch({
        type: "updateProfile",
        profile,
      });
    }
  }, [profile]);

  console.log("state", profile);

  return (
    <form
      className="profile-form-container card-body flex h-full w-full flex-1 flex-col flex-wrap content-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center">
        <h1 className="card-title">Profile</h1>
      </div>
      <div className="flex max-w-[400px] items-center justify-center">
        <ImageInput
          name="Profile Image"
          aspect={1}
          initialImageUrl={state.imageUrl}
          onImageChange={(blob) => setProfileImageBlob(blob)}
        />
      </div>
      <TextareaInput
        name="About"
        value={state.about || ""}
        onChange={(value) => dispatch({ type: "setAbout", about: value })}
      />
      <SelectInput
        name="Gender"
        options={["Male", "Female"]}
        value={state.gender === 1000 ? "Male" : "Female"}
        onChange={(value) =>
          dispatch({
            type: "setGender",
            gender: value === "Male" ? 1000 : 2000,
          })
        }
      />
      <NumberInput
        name="Age"
        min="1"
        max="200"
        value={state.age?.toString() || ""}
        onChange={(value) => dispatch({ type: "setAge", age: Number(value) })}
      />
      <NumberInput
        name="Weight"
        min="1"
        max="500"
        step="0.1"
        value={state.weight?.toString() || ""}
        onChange={(value) =>
          dispatch({ type: "setWeight", weight: Number(value) })
        }
      />
      <NumberInput
        name="Height"
        min="1"
        max="5"
        step="0.01"
        value={state.height?.toString() || ""}
        onChange={(value) =>
          dispatch({ type: "setHeight", height: Number(value) })
        }
      />
      <Button name="Submit" isLoading={state.isLoading} />
      {state.errorMessage && <Alert message={state.errorMessage} />}
    </form>
  );
};

export default ProfileFormContainer;

import { useReducer, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import TextareaInput from "../components/TextareaInput.tsx";
import NumberInput from "../components/NumberInput.tsx";
import SelectInput from "../components/SelectInput.tsx";
import Button from "../components/Button.tsx";
import Alert from "../components/Alert.tsx";
import ImageInput from "../components/ImageInput.tsx";
import { Home } from "../const/Links.ts";
import useProfile from "../hooks/useProfile.tsx";
import { ProfileState, ProfileAction } from "../models/Profile.ts";

const ProfileFormContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || Home;
  const { profile, updateProfile } = useProfile();
  const [profileImageBlob, setProfileImageBlob] = useState<Blob | null>(null);

  const [state, dispatch] = useReducer(
    (state: ProfileState, action: ProfileAction): ProfileState => {
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
            image: action.profile?.image || null,
            about: action.profile?.about || null,
            gender: action.profile?.gender || null,
            age: action.profile?.age || null,
            weight: action.profile?.weight || null,
            height: action.profile?.height || null,
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
      image: null,
      about: null,
      gender: null,
      age: null,
      weight: null,
      height: null,
      isLoading: false,
      errorMessage: null,
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    dispatch({ type: "setHandleSubmit", isLoading: true, errorMessage: null });
    e.preventDefault();

    try {
      await updateProfile(state, profileImageBlob);
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage: null,
      });

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
          label="Profile Image"
          aspect={1}
          initialImageUrl={state.image?.url || ""}
          onImageChange={(blob) => setProfileImageBlob(blob)}
        />
      </div>
      <TextareaInput
        label="About"
        name="about"
        value={state.about || ""}
        onChange={(value) => dispatch({ type: "setAbout", about: value })}
      />
      <SelectInput
        label="Gender"
        name="gender"
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
        label="Age"
        name="age"
        min="1"
        max="200"
        value={state.age?.toString() || ""}
        onChange={(value) => dispatch({ type: "setAge", age: Number(value) })}
      />
      <NumberInput
        label="Weight"
        name="weight"
        min="1"
        max="500"
        step="0.1"
        value={state.weight?.toString() || ""}
        onChange={(value) =>
          dispatch({ type: "setWeight", weight: Number(value) })
        }
      />
      <NumberInput
        label="Height"
        name="height"
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

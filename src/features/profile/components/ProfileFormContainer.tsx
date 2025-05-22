import { useReducer, FormEvent, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import TextareaInput from "../../../shared/components/form/TextareaInput.tsx";
import NumberInput from "../../../shared/components/form/NumberInput.tsx";
import SelectInput from "../../../shared/components/form/SelectInput.tsx";
import Button from "../../../shared/components/ui/Button.tsx";
import Alert from "../../../shared/components/ui/Alert.tsx";
import ImageInput from "../../../shared/components/form/ImageInput.tsx";
import { Home } from "../../../shared/const/Links.ts";
import ProfileContext from "../context/ProfileProvider.tsx";
import {
  ProfileState,
  ProfileAction,
  defaultProfileState,
} from "../types/Profile.ts";
import Gender from "../../../shared/const/Gender.ts";

const ProfileFormContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || Home;
  const { profile, updateProfile } = useContext(ProfileContext);
  const [profileImageBlob, setProfileImageBlob] = useState<Blob | null>(null);

  const [state, dispatch] = useReducer(
    (state: ProfileState, action: ProfileAction): ProfileState => {
      switch (action.type) {
        case "updateProfile":
          return {
            ...state,
            image: action.profile?.image || state.image,
            about: action.profile?.about || state.about,
            gender: action.profile?.gender || state.gender,
            age: action.profile?.age || state.age,
            weight: action.profile?.weight || state.weight,
            height: action.profile?.height || state.height,
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
    defaultProfileState,
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
        onChange={(value) =>
          dispatch({ type: "updateProfile", profile: { about: value } })
        }
      />
      <SelectInput
        label="Gender"
        name="gender"
        options={["Male", "Female"]}
        value={state.gender === Gender.Male ? "Male" : "Female"}
        onChange={(value) =>
          dispatch({
            type: "updateProfile",
            profile: { gender: value === "Male" ? Gender.Male : Gender.Female },
          })
        }
      />
      <NumberInput
        label="Age"
        name="age"
        min="1"
        max="200"
        required={true}
        value={state.age?.toString() || ""}
        onChange={(value) =>
          dispatch({
            type: "updateProfile",
            profile: { age: Number(value) },
          })
        }
      />
      <NumberInput
        label="Weight"
        name="weight"
        min="1"
        max="500"
        step="0.1"
        required={true}
        value={state.weight?.toString() || ""}
        onChange={(value) =>
          dispatch({
            type: "updateProfile",
            profile: { weight: Number(value) },
          })
        }
      />
      <NumberInput
        label="Height"
        name="height"
        min="0"
        max="5"
        step="0.01"
        required={true}
        value={state.height?.toString() || ""}
        onChange={(value) =>
          dispatch({
            type: "updateProfile",
            profile: { height: Number(value) },
          })
        }
      />
      <Button name="Submit" isLoading={state.isLoading} />
      {state.errorMessage && <Alert message={state.errorMessage} />}
    </form>
  );
};

export default ProfileFormContainer;

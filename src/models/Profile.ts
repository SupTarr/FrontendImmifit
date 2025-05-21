import { Image } from "./Image";

export interface ProfileState {
  profileId?: string | null;
  userId?: string | null;
  about?: string | null;
  gender?: number | null;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  bmi?: number | null;
  image?: Image | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const defaultProfileState: ProfileState = {
  profileId: null,
  userId: null,
  about: null,
  gender: null,
  age: null,
  weight: null,
  height: null,
  bmi: null,
  image: null,
  isLoading: false,
  errorMessage: null,
};

export type ProfileAction =
  | { type: "setAbout"; about: string | null }
  | { type: "setGender"; gender: number | null }
  | { type: "setAge"; age: number | null }
  | { type: "setWeight"; weight: number | null }
  | { type: "setHeight"; height: number | null }
  | { type: "updateProfile"; profile: Partial<ProfileState> }
  | {
      type: "setHandleSubmit";
      isLoading: boolean;
      errorMessage: string | null;
    };

export interface ProfileContextType {
  profile: ProfileState;
  updateProfile: (
    profileData: Partial<ProfileState>,
    file: Blob | null,
  ) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

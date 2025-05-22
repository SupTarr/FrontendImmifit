export interface RegisterState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  errorMessage: string | null;
}

export type RegisterAction =
  | { type: "setEmail"; email: string }
  | { type: "setUsername"; username: string }
  | { type: "setPassword"; password: string }
  | { type: "setConfirmPassword"; confirmPassword: string }
  | {
      type: "setHandleSubmit";
      isLoading: boolean;
      errorMessage: string | null;
    };

export interface RegisterResponse {
  status: string;
}

export interface LoginState {
  email: string;
  password: string;
  isLoading: boolean;
  errorMessage: string | null;
}

export type LoginAction =
  | { type: "setEmail"; email: string }
  | { type: "setPassword"; password: string }
  | {
      type: "setHandleSubmit";
      isLoading: boolean;
      errorMessage: string | null;
    };

export interface LoginResponse {
  status: string;
  body: {
    accessToken: string;
  };
}

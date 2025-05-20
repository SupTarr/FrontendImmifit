export interface AuthState {
  userId?: string | null;
  username?: string | null;
  email?: string | null;
  roles?: number[];
  accessToken?: string | null;
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

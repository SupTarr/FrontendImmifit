export interface RefreshResponse {
  body: {
    accessToken: string;
  };
}

export interface DecodedToken {
  userId?: string;
  username?: string;
  email?: string;
  roles?: number[];
  sub?: string;
  exp?: number;
}

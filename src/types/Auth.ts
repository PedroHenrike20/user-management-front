import type { UserDto } from "./User";

export type AuthState = {
  user: UserDto | null;
  isAuthenticated: boolean;
  accessToken: string | null;
};

export type ResponsePayloadLogin = {
  access_token: string;
};

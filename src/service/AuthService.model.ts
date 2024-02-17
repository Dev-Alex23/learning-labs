export type LoginCredentials = {
  email: string;
  password: string;
};

export type RefreshResponse = {
  isAuthenticated?: boolean;
  accessToken?: string;
  message?: string;
};
export type User = {
  id?: string;
  name?: string;
  email?: string;
  accessToken?: string;
  isAuthenticated?: boolean;
};

export interface AuthServiceModel {
  login: (credentials: LoginCredentials) => Promise<User | undefined>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<RefreshResponse | undefined>;
}

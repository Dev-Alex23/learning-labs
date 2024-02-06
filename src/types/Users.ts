export type User = {
  id?: string;
  name?: string;
  email?: string;
  accessToken?: string;
  isAuthenticated?: boolean;
};
export type LoginCredentials = {
  email: string;
  password: string;
};

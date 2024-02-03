import { User } from './Users';

export type AuthContextType = {
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

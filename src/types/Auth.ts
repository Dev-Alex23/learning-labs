import { User } from './Users';

export type AuthContextType = {
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

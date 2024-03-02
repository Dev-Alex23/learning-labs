import { ReactNode, useState } from 'react';
import { authLogin, authLogout } from '@service/AuthService';
import { User } from 'src/types/Users';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  console.log({ user });

  const login = async (email: string, password: string) => {
    try {
      const userData = await authLogin({ email, password });
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setUser(undefined);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const value = { user, setUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

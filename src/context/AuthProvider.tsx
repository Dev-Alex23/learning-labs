import AuthService from '@service/AuthService';
import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';
import { User } from 'src/types/Users';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const userData = await AuthService.login({ email, password });
      if (userData) {
        setUser(userData);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(undefined);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const value = { user, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

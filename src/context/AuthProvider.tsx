import AuthService from '@service/AuthService';
import { ReactNode, useState } from 'react';
import { User } from 'src/types/Users';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  console.log({ user });

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await AuthService.login({ email, password });
      if (userData) {
        setUser(userData);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    } finally {
      setIsLoading(false);
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

  const value = { user, setUser, login, logout, isLoading, setIsLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

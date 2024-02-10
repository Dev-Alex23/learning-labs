import AuthService from '@service/AuthService';
import { Response } from 'src/types/Service';
import { useAuth } from './useAuth';
import { ShowToast } from '@utils/ShowToast';
import { useCallback } from 'react';

export const useRefreshToken = () => {
  const { setUser, setIsLoading } = useAuth();

  const verifyRefreshToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: Response | undefined = await AuthService.refreshToken();
      setUser((prev) => ({
        ...prev,
        accessToken: response?.accessToken,
        isAuthenticated: response?.isAuthenticated,
      }));
    } catch (error) {
      if (error instanceof Error) {
        ShowToast(error.message, 'error');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setUser]);

  return verifyRefreshToken;
};

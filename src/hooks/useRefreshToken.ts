import AuthService from '@service/AuthService';
import { ShowToast } from '@utils/ShowToast';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Response } from 'src/types/Service';
import { useAuth } from './useAuth';

export const useRefreshToken = () => {
  const { setUser, setIsLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const verifyRefreshToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: Response | undefined = await AuthService.refreshToken();
      if (response?.isAuthenticated) {
        setUser(response);
      } else {
        navigate('/', { state: { from: location }, replace: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        ShowToast(error.message, 'error');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [location, navigate, setIsLoading, setUser]);

  return verifyRefreshToken;
};

import { showToast } from '@utils/ShowToast';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { authRefreshToken } from '@service/AuthService';

export const useRefreshToken = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const verifyRefreshToken = useCallback(async () => {
    try {
      const response = await authRefreshToken();
      if (response?.isAuthenticated) {
        setUser(response);
      } else {
        navigate('/', { state: { from: location }, replace: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
      console.error(error);
    }
  }, [location, navigate, setUser]);

  return verifyRefreshToken;
};

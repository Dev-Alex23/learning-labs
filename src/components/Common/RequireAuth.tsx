import { useAuth } from '@hooks/useAuth';
import { useRefreshToken } from '@hooks/useRefreshToken';
import { useEffect } from 'react';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  const verifyRefreshToken = useRefreshToken();

  useEffect(() => {
    if (!user?.accessToken) {
      verifyRefreshToken();
    }
  }, [user?.accessToken, verifyRefreshToken]);

  return children;
};

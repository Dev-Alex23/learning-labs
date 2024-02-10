import { useAuth } from '@hooks/useAuth';
import { useRefreshToken } from '@hooks/useRefreshToken';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const PersistLogin = () => {
  const { user, isLoading } = useAuth();
  const verifyRefreshToken = useRefreshToken();

  useEffect(() => {
    if (!user?.accessToken) {
      verifyRefreshToken();
    }
  }, [user?.accessToken, verifyRefreshToken]);
  return <>{isLoading ? <h1>Loading....</h1> : <Outlet />}</>;
};

import { useAuth } from '@hooks/useAuth';
import { useRefreshToken } from '@hooks/useRefreshToken';
import { Suspense, useEffect } from 'react';
import { Loader } from './Loader';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  const verifyRefreshToken = useRefreshToken();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      verifyRefreshToken();
    }
  }, [user?.isAuthenticated, verifyRefreshToken]);

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

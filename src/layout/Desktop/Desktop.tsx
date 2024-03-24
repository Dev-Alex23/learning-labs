import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const DesktopLayout = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  console.log('test', { isSignedIn });

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in', { replace: true });
    }
  }, [navigate, isSignedIn]);

  return <Outlet />;
};

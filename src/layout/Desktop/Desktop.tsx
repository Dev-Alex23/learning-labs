import { useAuth, useUser } from '@clerk/clerk-react';
import { Loader } from '@components/Common/Loader';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const DesktopLayout = () => {
  const { isLoaded } = useAuth();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  console.log('test', { isSignedIn });

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in');
    }
  }, [navigate, isSignedIn]);

  if (!isLoaded) {
    return <Loader />;
  }

  return <Outlet />;
};

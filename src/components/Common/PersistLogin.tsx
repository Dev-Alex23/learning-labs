import { useAuth } from '@hooks/useAuth';
import AuthService from '@service/AuthService';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Response } from 'src/types/Service';

export const PersistLogin = () => {
  const { user, setUser, isLoading, setIsLoading } = useAuth();
  // const data = AuthService.refreshToken();
  // console.log(data);
  useEffect(() => {
    // const verifyRefreshToken = async () => {
    //   try {
    //     setIsLoading(true);
    //     const data = await AuthService.refreshToken();
    //     setUser((prev) => {
    //       console.log({ prev });
    //       return {
    //         ...prev,
    //         accessToken: data ?? '',
    //         isAuthenticated: true,
    //       };
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }

    //   if (!user?.accessToken) {
    //     verifyRefreshToken();
    //   } else {
    //     setIsLoading(false); // Ensure loading is set to false if there's already an accessToken
    //   }
    // };
    // !user?.accessToken ? verifyRefreshToken() : console.log('This did not work');

    if (!user?.accessToken) {
      const verifyRefreshToken = async () => {
        try {
          setIsLoading(true);
          // if (user?.id == undefined) return;
          const response: Response | undefined = await AuthService.refreshToken();
          setUser((prev) => ({
            ...prev,
            accessToken: response?.accessToken,
            isAuthenticated: response?.isAuthenticated,
          }));
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      verifyRefreshToken();
    }
  }, []);
  useEffect(() => {
    console.log({ user });

    console.log(`isLoading: ${isLoading}`);
    console.log(`Access token ${user?.accessToken}`);
  }, [isLoading]);
  return <>{isLoading ? <h1>Loading....</h1> : <Outlet />}</>;
};

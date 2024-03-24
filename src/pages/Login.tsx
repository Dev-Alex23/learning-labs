import { SignIn, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      return navigate('/chat', { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <div className='flex'>
      <div className='h-[100vh] w-[50vw] flex items-center '>
        <div className='w-[99%] h-[98%] rounded-lg m-auto bg-black'></div>
      </div>
      <div className='h-[100vh - 10rem]  w-[50vw] flex items-center justify-center m-10'>
        <SignIn signUpUrl='/sign-up' afterSignInUrl='/chat' />
      </div>
    </div>
  );
};

export default Login;

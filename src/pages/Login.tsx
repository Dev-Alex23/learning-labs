import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  // const { isSignedIn } = useUser();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     return navigate('/chat', { replace: true });
  //   }
  // }, [isSignedIn, navigate]);

  return (
    <div className='flex h-full'>
      <div className='w-[50vw] flex items-center '>
        <div className='w-full h-full rounded-lg bg-black'></div>
      </div>
      <div className='h-[100vh - 10rem] w-[50vw] flex items-center justify-center'>
        <SignIn />
        {/* <SignIn signUpUrl='/sign-up' afterSignInUrl='/chat' /> */}
      </div>
    </div>
  );
};

export default Login;

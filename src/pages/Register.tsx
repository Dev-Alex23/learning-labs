import { Button, Input } from '@material-tailwind/react';
import { ShowToast } from '@utils/ShowToast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className='flex'>
      <div className='h-[100vh] w-[50vw] bg-black'></div>
      <div className='h-[100vh - 10rem]  w-[50vw] flex flex-col justify-center m-10'>
        <div className='mb-10'>
          <h1 className='text-5xl text-center'>Register an account</h1>
          <h4 className='text-xs text-center text-gray-600'>Enter your email and password to access your account</h4>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <Input crossOrigin={undefined} label='Email' type='email' />
            <Input crossOrigin={undefined} label='Password' type='password' />
          </div>
          <Button placeholder={'Register'} onClick={() => ShowToast('You are registered')}>
            Register
          </Button>
          <Button placeholder={'Already have an account?'} onClick={() => navigate('/')}>
            Already have an account?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;

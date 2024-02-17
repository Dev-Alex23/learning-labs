import { useAuth } from '@hooks/useAuth';
import { Button, Input } from '@material-tailwind/react';
import { ShowToast } from '@utils/ShowToast';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      ShowToast('Email or password is required', 'error');
      return;
    }
    try {
      await login(email, password);
      navigate('chat');
    } catch (error) {
      if (error instanceof Error) {
        ShowToast(error.message, 'error');
      }
    }
  };

  return (
    <div className='flex'>
      <div className='h-[100vh] w-[50vw] flex items-center '>
        <div className='w-[99%] h-[98%] rounded-lg m-auto bg-black'></div>
      </div>
      <div className='h-[100vh - 10rem]  w-[50vw] flex flex-col justify-center m-10'>
        <div className='mb-10'>
          <h1 className='text-5xl text-center'>Welcome Back</h1>
          <h4 className='text-xs text-center text-gray-600'>Enter your email and password to access your account</h4>
        </div>
        <form onSubmit={handleLogin}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Input
                crossOrigin={undefined}
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
              />
              <Input
                crossOrigin={undefined}
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
              />
            </div>
            <Button placeholder={'Login'} type='submit'>
              Login
            </Button>
            <Button placeholder={'Register'} onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

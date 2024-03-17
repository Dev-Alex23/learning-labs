import { useAuth } from '@hooks/useAuth';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  return (
    <aside className='h-full w-full bg-green-300 rounded-lg flex flex-col justify-center'>
      <Button placeholder='Logout' onClick={handleLogout} variant='text'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
          />
        </svg>
      </Button>
    </aside>
  );
};

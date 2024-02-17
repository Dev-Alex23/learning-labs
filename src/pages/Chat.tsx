import { useAuth } from '@hooks/useAuth';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <Button placeholder='Logout' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Chat;

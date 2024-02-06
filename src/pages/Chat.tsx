import { useAuth } from '@hooks/useAuth';
import { Button } from '@material-tailwind/react';

export const Chat = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div>
      <Button placeholder='Logout' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

import { Avatar } from '@material-tailwind/react';
import { FC } from 'react';

interface UserAvatarProps {
  username?: string | null;
}

export const ChatAvatar: FC<UserAvatarProps> = ({ username }) => {
  const name = username
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}}&background=000&color=fff`
    : 'https://docs.material-tailwind.com/img/face-2.jpg';
  return <Avatar size={'md'} src={name} alt='avatar' className='cursor-pointer' />;
};

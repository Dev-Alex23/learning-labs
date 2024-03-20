import { Avatar } from '@material-tailwind/react';
import { FC } from 'react';

interface UserAvatarProps {
  src?: string;
}

export const ChatAvatar: FC<UserAvatarProps> = ({ src }) => {
  const userImg = src ?? 'https://docs.material-tailwind.com/img/face-2.jpg';
  return <Avatar size={'md'} src={userImg} alt='avatar' className='cursor-pointer' />;
};

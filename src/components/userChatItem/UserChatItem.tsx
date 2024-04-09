import { ChatAvatar } from '@components/Common/avatar/Avatar';
import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';
import { FC } from 'react';

interface UserChatItemProp {
  userImgUrl?: string;
  username: string;
  latestMessage: string;
  timeStamp: string;
  onlineStatus?: 'green';
}

export const UserChatItem: FC<UserChatItemProp> = ({ userImgUrl, username, latestMessage, timeStamp }) => {
  const { setSelectedContact } = useChat();

  return (
    <div
      className='flex gap-4 p-5 border-gray-200 border-b-2 items-center justify-center cursor-pointer'
      onClick={() => setSelectedContact(username)}
    >
      {/* <Badge color={'gray'} overlap='circular'> */}
      <ChatAvatar src={userImgUrl} />
      {/* </Badge> */}
      <div className='w-full flex flex-col gap-1'>
        <div className=' flex justify-between'>
          <Typography className='capitalize font-poppins font-medium'>{username}</Typography>
          <Typography className='text-gray-500 font-poppins font-normal text-sm'>{timeStamp}</Typography>
        </div>
        <div>
          <Typography className='truncate max-w-[300px] text-gray-600 font-poppins font-normal'>
            {latestMessage}
          </Typography>
        </div>
      </div>
    </div>
  );
};

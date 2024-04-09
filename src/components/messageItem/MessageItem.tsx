import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';
import { FC } from 'react';

interface MessageProps {
  content: string;
  timeStamp?: string;
  sender: string;
}

export const MessageItem: FC<MessageProps> = ({ content, timeStamp, sender }) => {
  const { currentUserId } = useChat();

  // TODO: Check if it is possible to be able to not call to lower case
  const messageBG = currentUserId?.toLowerCase() === sender.toLowerCase() ? 'bg-[#278EFF] self-end' : 'bg-[#2FCC59]';
  const justify = currentUserId?.toLowerCase() === sender.toLowerCase() ? 'self-end' : '';

  return (
    <>
      <Typography className={`text-gray-500 font-poppins font-normal text-sm ${justify}`}>{timeStamp}</Typography>
      <div className={`max-w-fit flex ${messageBG} p-3 rounded-xl`}>
        <Typography className='text-white font-poppins max-w-xl break-words'>{content}</Typography>
      </div>
    </>
  );
};

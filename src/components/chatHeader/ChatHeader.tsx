import { ChatAvatar } from '@components/Common/avatar/Avatar';
import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';
import { FC } from 'react';

interface ChatHeaderProps {
  userImgUrl?: string;
  status: 'offline' | 'online';
}

export const ChatHeader: FC<ChatHeaderProps> = ({ userImgUrl, status }) => {
  const { contacts, selectedContact } = useChat();
  const currentChatDetails = contacts.find((contact) => contact.contactId === selectedContact);
  return (
    <section className='w-full h-[90px] rounded-lg bg-white'>
      <div className='flex gap-4 p-5 border-gray-200 items-center justify-center'>
        <ChatAvatar src={userImgUrl} />
        <div className='w-full flex flex-col gap-1'>
          <div className=' flex flex-col justify-between'>
            <Typography className='capitalize font-poppins font-medium'>{currentChatDetails?.contactId}</Typography>
            <Typography className='capitalize text-gray-500  font-normal text-sm'>{status}</Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

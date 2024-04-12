import { ChatComposer } from '@components/chatComposer/ChatComposer';
import { ChatHeader } from '@components/chatHeader/ChatHeader';
import { ChatHistory } from '@components/chatHistory/ChatHistory';
import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';

export const ChatPanel = () => {
  const { selectedContact } = useChat();

  if (selectedContact === null) {
    return (
      <section className='flex flex-col justify-center items-center gap-5 bg-white rounded-lg'>
        <Typography>Please select a contact to view chat history</Typography>
      </section>
    );
  }

  return (
    <section className='grid grid-rows-[90px_1fr_90px] gap-5'>
      <ChatHeader status='online' />
      <ChatHistory />
      <ChatComposer />
    </section>
  );
};

import { ChatComposer } from '@components/chatComposer/ChatComposer';
import { ChatHeader } from '@components/chatHeader/ChatHeader';
import { ChatHistory } from '@components/chatHistory/ChatHistory';

export const ChatPanel = () => {
  return (
    <section className='grid grid-rows-[90px_1fr_90px] gap-5'>
      <ChatHeader username='Hawkins William' status='online' />
      <ChatHistory />
      <ChatComposer />
    </section>
  );
};

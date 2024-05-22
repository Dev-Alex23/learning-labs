import { ChatComposer } from '@components/chatComposer/ChatComposer';
import { ChatHeader } from '@components/chatHeader/ChatHeader';
import { ChatHistory } from '@components/chatHistory/ChatHistory';

export const ChatPanel = () => {
  return (
    <section className='grid grid-rows-[90px_1fr_90px] max-h-[calc(100vh-48px)] gap-5'>
      <ChatHeader status='online' />
      <ChatHistory />
      <ChatComposer />
    </section>
  );
};

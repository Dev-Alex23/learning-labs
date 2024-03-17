import { ChatComposer } from '@components/chatComposer/ChatComposer';
import { ChatHeader } from '@components/chatHeader/ChatHeader';
import { ChatHistory } from '@components/chatHistory/ChatHistory';

export const ChatPanel = () => {
  return (
    <section className='flex flex-col gap-5'>
      <ChatHeader />
      <ChatHistory />
      <ChatComposer />
    </section>
  );
};

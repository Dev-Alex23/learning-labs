import { MessageItem } from '@components/messageItem/MessageItem';
import { useChat } from '@hooks/useChat';
import { useEffect, useRef } from 'react';

export const ChatHistory = () => {
  const { state, selectedContact } = useChat();
  const currentChatDetails = selectedContact?.toLowerCase() ? state.messages.get(selectedContact.toLowerCase()) : null;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

    return () => {};
  }, [currentChatDetails?.length]);

  return (
    <section className='w-full rounded-lg bg-white flex flex-col p-6 gap-2 overflow-auto'>
      {currentChatDetails?.map(({ content, timestamp, messageFrom, messageId }) => {
        return <MessageItem content={content ?? ''} timeStamp={timestamp} sender={messageFrom ?? ''} key={messageId} />;
      })}
      <div ref={scrollRef} />
    </section>
  );
};

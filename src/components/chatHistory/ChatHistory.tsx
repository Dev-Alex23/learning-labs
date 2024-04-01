import { MessageItem } from '@components/messageItem/MessageItem';
import { useChat } from '@hooks/useChat';
import { useEffect, useRef } from 'react';

export const ChatHistory = () => {
  const { contacts, selectedContact } = useChat();
  const currentChatDetails = contacts.find((contact) => contact.contactId === selectedContact);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

    return () => {};
  }, [currentChatDetails?.messages.length]);

  return (
    <section className='w-full h-full rounded-lg bg-white flex flex-col p-6 gap-2 overflow-auto'>
      {currentChatDetails?.messages.map(({ content, timeStamp, senderId }, index) => {
        return <MessageItem content={content} timeStamp={timeStamp} sender={senderId} key={index} />;
      })}
      <div ref={scrollRef} />
    </section>
  );
};

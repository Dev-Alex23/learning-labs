import { MessageItem } from '@components/messageItem/MessageItem';
import { useChat } from '@hooks/useChat';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { useRef } from 'react';

export const ChatHistory = () => {
  const { state, selectedContact } = useChat();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const messages = selectedContact?.toLowerCase() ? state.messages.get(selectedContact.toLowerCase()) : null;

  useIntersectionObserver({ lastMessageRef, rootRef, messages });

  return (
    <section className='w-full rounded-lg bg-white flex flex-col p-6 gap-2 overflow-auto no-scrollbar' ref={rootRef}>
      {messages?.map(({ content, timestamp, messageFrom, messageId }, index) => {
        return (
          <MessageItem
            content={content ?? ''}
            timeStamp={timestamp}
            sender={messageFrom ?? ''}
            key={messageId}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          />
        );
      })}
    </section>
  );
};

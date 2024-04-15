import { UserChatItem } from '@components/userChatItem/UserChatItem';
import { useChat } from '@hooks/useChat';
import { NoUser } from './NoUser';

export const UserList = () => {
  const {
    state: { contacts, messages },
  } = useChat();

  const allContacts = Array.from(contacts);

  if (allContacts.length < 1) {
    return <NoUser />;
  }

  return (
    <section className='bg-white rounded-lg flex flex-col no-scrollbar overflow-auto '>
      {allContacts.map(([key, contact]) => {
        const currentMessages = messages.get(contact.fullName.toLowerCase());
        const latestMessageIndex = (currentMessages?.length ?? 0) - 1;
        const latestMessage = currentMessages?.[latestMessageIndex].content ?? 'No messages yet!';
        const latestTimeStamp = currentMessages?.[latestMessageIndex].timestamp ?? '';

        return (
          <UserChatItem
            username={contact.fullName}
            latestMessage={latestMessage}
            timeStamp={latestTimeStamp}
            key={key}
          />
        );
      })}
    </section>
  );
};

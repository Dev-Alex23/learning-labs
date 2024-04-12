import { AddUser } from '@components/addUser/AddUser';
import { UserChatItem } from '@components/userChatItem/UserChatItem';
import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';

export const UserList = () => {
  const {
    state: { contacts, messages },
  } = useChat();

  const allContacts = Array.from(contacts);

  if (allContacts.length < 1) {
    return (
      <section className='bg-white h-full w-full rounded-lg flex flex-col justify-center items-center overflow-auto gap-6'>
        <div className='text-center'>
          <Typography className='capitalize font-poppins font-medium'>Please add a new user</Typography>
        </div>
        <AddUser onClick={() => {}} />
      </section>
    );
  }

  return (
    <section className='bg-white rounded-lg flex flex-col no-scrollbar overflow-auto '>
      {allContacts.map(([key, contact]) => {
        const currentMessages = messages.get(contact.fullName.toLowerCase());
        const latestMessageIndex = (currentMessages?.length ?? 0) - 1;
        const latestMessage = currentMessages?.[latestMessageIndex].content ?? 'No messages yet!';
        const latestTimeStamp = currentMessages?.[latestMessageIndex].timestamp ?? '';
        console.log({ currentMessages, latestMessageIndex, latestMessage, latestTimeStamp });

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

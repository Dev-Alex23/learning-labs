import { AddUser } from '@components/addUser/AddUser';
import { UserChatItem } from '@components/userChatItem/UserChatItem';
import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';

export const UserList = () => {
  const { contacts } = useChat();
  console.log(contacts);

  if (contacts.length < 1) {
    return (
      <section className='bg-white h-full max-h-[calc(100vh-130px)] w-full rounded-lg flex flex-col justify-center items-center overflow-auto gap-6'>
        <div className='text-center'>
          <Typography className='capitalize font-poppins font-medium'>Please add a new user</Typography>
        </div>
        <AddUser onClick={() => {}} />
      </section>
    );
  }

  return (
    <section className='bg-white h-full max-h-[calc(100vh-130px)] w-full rounded-lg flex flex-col no-scrollbar overflow-auto '>
      {contacts.map((contact) => {
        const latestMessageIndex = contact.messages.length - 1;
        const latestMessage = contact.messages[latestMessageIndex]?.content ?? 'No Messages Yet!';
        const latestTimeStamp = contact.messages[latestMessageIndex]?.timeStamp ?? '';
        return (
          <UserChatItem
            username={contact.contactId}
            latestMessage={latestMessage}
            timeStamp={latestTimeStamp}
            key={contact.contactId}
          />
        );
      })}
    </section>
  );
};

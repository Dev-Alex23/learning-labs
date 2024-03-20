import { UserChatItem } from '@components/userChatItem/UserChatItem';

const users = [
  {
    username: 'hawkins william',
    latestMessage: 'System also especially low caskdjhflaksjdhfakljsdhfklajsdhf k sdklfjhasldkjfollege design.',
    timeStamp: '14:22',
  },
  {
    username: 'laurie johnson',
    latestMessage: 'Think arrive statement around.',
    timeStamp: '09:10',
  },
];

export const UserList = () => {
  return (
    <section className='bg-white h-full max-h-[calc(100vh-130px)] w-full rounded-lg flex flex-col no-scrollbar overflow-auto '>
      {users.map((user) => {
        return (
          <UserChatItem
            username={user.username}
            latestMessage={user.latestMessage}
            timeStamp={user.timeStamp}
            key={user.username}
          />
        );
      })}
    </section>
  );
};

import { useUser } from '@clerk/clerk-react';
import { ChatPanel } from '@components/chatPanel/ChatPanel';
import { UserManagementPanel } from '@components/userManagermentPanel/UserManagementPanel';
import { ChatProvider } from '@context/ChatProvider';

const Chat = () => {
  const { user } = useUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className='grid grid-cols-[420px_1fr] h-full gap-5'>
      <ChatProvider currentUser={fullName}>
        <UserManagementPanel />
        <ChatPanel />
      </ChatProvider>
    </div>
  );
};

export default Chat;

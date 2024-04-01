import { useUser } from '@clerk/clerk-react';
import { ChatPanel } from '@components/chatPanel/ChatPanel';
import { UserManagementPanel } from '@components/userManagermentPanel/UserManagementPanel';
import { ChatProvider } from '@context/ChatProvider';

const Chat = () => {
  const { user } = useUser();
  console.log(user?.id);
  return (
    <div className='grid grid-cols-[420px_1fr] h-full gap-5'>
      <ChatProvider currentUserId={user?.id}>
        <UserManagementPanel />
        <ChatPanel />
      </ChatProvider>
    </div>
  );
};

export default Chat;

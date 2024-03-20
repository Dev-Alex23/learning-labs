import { ChatPanel } from '@components/chatPanel/ChatPanel';
import { UserManagementPanel } from '@components/userManagermentPanel/UserManagementPanel';

const Chat = () => {
  return (
    <div className='grid grid-cols-[420px_1fr] h-full gap-5'>
      <UserManagementPanel />
      <ChatPanel />
    </div>
  );
};

export default Chat;

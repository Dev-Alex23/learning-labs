import { Navigation } from '@components/Common/Navigation';
import { ChatPanel } from '@components/chatPanel/ChatPanel';
import { UserManagementPanel } from '@components/userManagermentPanel/UserManagementPanel';

const Chat = () => {
  return (
    <div className='grid grid-cols-[80px_420px_1fr] h-full gap-5'>
      <Navigation />
      <UserManagementPanel />
      <ChatPanel />
    </div>
  );
};

export default Chat;

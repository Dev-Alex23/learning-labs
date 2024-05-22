import { SignedIn } from '@clerk/clerk-react';
import { UserManagementPanel } from '@components/userManagermentPanel/UserManagementPanel';
import { Outlet } from 'react-router-dom';

export const DesktopLayout = () => {
  return (
    <div className='grid grid-cols-[420px_1fr] h-full gap-5'>
      <SignedIn>
        <UserManagementPanel />
        <Outlet />
      </SignedIn>
    </div>
  );
};

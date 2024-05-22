import { SignIn, SignedOut } from '@clerk/clerk-react';
import { showToast } from '@utils/ShowToast';
import { Outlet } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  showToast('Missing Publishable Key', 'error');
  throw new Error('Missing Publishable Key');
}

export const RootLayout = () => {
  return (
    <main className='w-screen h-screen bg-gray-100 p-6'>
      <SignedOut>
        {/* <Login /> */}
        <SignIn />
      </SignedOut>
      <Outlet />
    </main>
  );
};

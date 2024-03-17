import { ClerkProvider } from '@clerk/clerk-react';
import { showToast } from '@utils/ShowToast';
import { Outlet, useNavigate } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  showToast('Missing Publishable Key', 'error');
  throw new Error('Missing Publishable Key');
}

export const RootLayout = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
};

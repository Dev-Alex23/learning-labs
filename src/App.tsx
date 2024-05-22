import { ClerkProvider } from '@clerk/clerk-react';
import { Router } from '@routes/routes';
import { showToast } from '@utils/ShowToast';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    showToast('Missing Publishable Key', 'error');
    throw new Error('Missing Publishable Key');
  }

  return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{<Router />}</ClerkProvider>;
}

export default App;

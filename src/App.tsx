import { ErrorFallback } from '@components/Common/ErrorFallback';
import { ErrorPage } from '@components/Common/ErrorPage';
import { Loader } from '@components/Common/Loader';
import { Root } from '@components/Common/Root';
import { SuspenseWrapper } from '@components/Common/SuspenseWrapper';
import { AuthProvider } from '@context/AuthProvider';
import { lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const Chat = lazy(() => import('@pages/Chat'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: '/',
        element: <Login />,
        index: true,
      },
      {
        path: '/sign-in',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <Register />,
      },
      {
        element: <DesktopLayout />,
        errorElement: <ErrorFallback />,
        children: [
          {
            element: <Chat />,
            path: '/chat',
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

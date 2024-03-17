import { ErrorFallback } from '@components/Common/ErrorFallback';
import { RootLayout } from '@layout/Root/Root';
import Login from '@pages/Login';
import Register from '@pages/Register';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
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
    ],
  },
]);

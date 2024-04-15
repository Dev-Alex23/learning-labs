import { ErrorFallback } from '@components/Common/ErrorFallback';
import { Suspense, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@layout/Root/Root';
import Login from '@pages/Login';
import Register from '@pages/Register';
import { DesktopLayout } from '@layout/Desktop/Desktop';
import { Loader } from '@components/Common/Loader';

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
            element: (
              <Suspense fallback={<Loader />}>
                <Chat />
              </Suspense>
            ),
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

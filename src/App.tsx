import { ErrorPage } from '@components/ErrorPage';
import { Root } from '@components/Root';
import { Chat } from '@pages/Chat';
import { Login } from '@pages/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from '@context/AuthProvider';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Login />, index: true },
        { path: 'chat', element: <ProtectedRoute />, children: [{ index: true, element: <Chat /> }] },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

import { lazy } from 'react';
import './App.css';
import { Root } from '@components/Common/Root';
import { RequireAuth } from '@components/Common/RequireAuth';
import { ErrorPage } from '@components/Common/ErrorPage';
import { AuthProvider } from '@context/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import { SuspenseWrapper } from '@components/Common/SuspenseWrapper';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from '@components/Common/Loader';
import { ErrorFallback } from '@components/Common/ErrorFallback';

const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Chat = lazy(() => import('@pages/Chat'));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Root />}>
          <Route
            path='/'
            element={
              <SuspenseWrapper fallback={<Loader />}>
                <Login />
              </SuspenseWrapper>
            }
          />
          <Route
            path='/register'
            element={
              <SuspenseWrapper fallback={<Loader />}>
                <Register />
              </SuspenseWrapper>
            }
          />
          <Route
            path='/chat'
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <SuspenseWrapper fallback={<Loader />}>
                  <RequireAuth>
                    <Chat />
                  </RequireAuth>
                </SuspenseWrapper>
              </ErrorBoundary>
            }
          />
          <Route
            path='*'
            element={
              <SuspenseWrapper fallback={<Loader />}>
                <ErrorPage />
              </SuspenseWrapper>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

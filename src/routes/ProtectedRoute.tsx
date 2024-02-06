import { useAuth } from '@hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  return user?.isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
};

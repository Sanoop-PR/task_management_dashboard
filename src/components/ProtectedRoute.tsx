import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
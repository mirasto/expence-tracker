import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/providers/store/store';

export const PrivateRoute = () => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};

export const RestrictedRoute = () => {
  const { user, isLoading } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

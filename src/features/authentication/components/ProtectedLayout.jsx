import { Link, Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const Outlet = useOutlet();

  if (!user) {
    return <Navigate to='/' />;
  }

  return <div>{Outlet}</div>;
};

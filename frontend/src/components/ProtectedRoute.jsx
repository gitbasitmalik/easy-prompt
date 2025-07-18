import { Navigate, Outlet } from 'react-router-dom';
import auth from '../auth';

export default function ProtectedRoute({ children }) {
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

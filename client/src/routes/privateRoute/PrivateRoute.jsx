import { useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Loading from '../../shared/loadingSpnier/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivateRoute;

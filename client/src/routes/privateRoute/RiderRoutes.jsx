import { useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const RiderRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const { role, isLoading } = useRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (user && role === 'Rider') {
    return children;
  }

  return (
    logOut(), (<Navigate to="/login" state={{ from: location }} replace />)
  );
};

export default RiderRoute;

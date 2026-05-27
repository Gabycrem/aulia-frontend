import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const storedUser = sessionStorage.getItem('aulia_user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
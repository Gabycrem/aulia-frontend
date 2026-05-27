import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const routesByRole = {
  admin: '/dashboard/admin',
  gab: '/dashboard/gabinete',
  teacher: '/dashboard/docente',
  student: '/dashboard/estudiante',
  direct: '/dashboard/directivo',
};

function RoleRoute({ children, allowedRoles }) {
  const storedUser = sessionStorage.getItem('aulia_user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={routesByRole[user.role] || '/login'} replace />;
  }
  return <PrivateRoute>{children}</PrivateRoute>;
}
export default RoleRoute;
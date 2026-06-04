import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import {
  clearSession,
  getSessionUser,
  hasValidSession,
} from "../utils/session";

const routesByRole = {
  Admin: "/dashboard/admin",
  Gabinete: "/dashboard/gabinete",
  Docente: "/dashboard/docente",
  Alumno: "/dashboard/estudiante",
  Directivo: "/dashboard/directivo",
};

function RoleRoute({ children, allowedRoles }) {
  if (!hasValidSession()) {
    clearSession();
    return <Navigate to="/login" replace />;
  }

  const user = getSessionUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={routesByRole[user.role] || "/login"} replace />;
  }

  return <PrivateRoute>{children}</PrivateRoute>;
}

export default RoleRoute;
import { Navigate } from "react-router-dom";
import { clearSession, hasValidSession } from "../utils/session";

function PrivateRoute({ children }) {
  if (!hasValidSession()) {
    clearSession();
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
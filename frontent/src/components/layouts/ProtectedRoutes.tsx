import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type allowedRolesType = {
  allowedRoles?: string[];
};

export default function ProtectedRoute({ allowedRoles }: allowedRolesType) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

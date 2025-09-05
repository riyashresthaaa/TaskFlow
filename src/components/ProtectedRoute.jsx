import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { session } = useAuth();
  return session.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

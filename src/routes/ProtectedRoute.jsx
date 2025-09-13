import { Navigate, Outlet } from "react-router";
//helpers
import { useUser } from "../hooks/user/useUser.jsx";
export const ProtectedRoute = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

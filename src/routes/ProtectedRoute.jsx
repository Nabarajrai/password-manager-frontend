import { Navigate, Outlet } from "react-router";
export const ProtectedRoute = () => {
  const user = false;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

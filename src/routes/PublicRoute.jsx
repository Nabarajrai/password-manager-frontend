import { Navigate, Outlet } from "react-router";
export const PublicRoute = () => {
  const user = false;
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

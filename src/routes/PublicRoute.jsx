import { Navigate, Outlet } from "react-router";
//helpers
import { useUser } from "../hooks/user/useUser.jsx";
export const PublicRoute = () => {
  const user = useUser();
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

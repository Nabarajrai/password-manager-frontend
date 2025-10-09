import { Navigate, Outlet } from "react-router";
//hooks
import { useVerifyToken } from "../hooks/verifyToken/VerifyToken";
export const PublicRoute = () => {
  const { data: user } = useVerifyToken();

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

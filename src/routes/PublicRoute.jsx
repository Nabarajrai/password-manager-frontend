import { Navigate, Outlet } from "react-router";
//helpers
import { useUser } from "../helpers/user.helper.jsx";
export const PublicRoute = () => {
  const user = useUser();
  console.log("PublicRoute user:", user);
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

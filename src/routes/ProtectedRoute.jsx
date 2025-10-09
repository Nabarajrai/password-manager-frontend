import { Navigate, Outlet } from "react-router";

//hooks
import { useVerifyToken } from "../hooks/verifyToken/VerifyToken";
import { useToast } from "../hooks/toast/useToast";

//loader
import Loading from "../components/loading/Loading";
export const ProtectedRoute = () => {
  const { showSuccessToast } = useToast();
  const { data: user, isPending, isError, error } = useVerifyToken();
  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    showSuccessToast(error.message, "error");
    return <Navigate to="/login" replace />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

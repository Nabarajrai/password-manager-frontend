import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
// hooks
import { useVerifyToken } from "../hooks/verifyToken/VerifyToken";
import { useToast } from "../hooks/toast/useToast";
// loader
import Loading from "../components/loading/Loading";

export const ProtectedRoute = () => {
  const location = useLocation(); // ✅ Add to check current path
  const { showSuccessToast } = useToast();
  const { data, isPending, isError, error } = useVerifyToken();

  const user = data?.user;

  useEffect(() => {
    if (isError && error?.message) {
      showSuccessToast(error.message, "error");
    }
  }, [isError, error, showSuccessToast]);

  // While loading token verification
  if (isPending) {
    return <Loading />;
  }

  // If verification fails, redirect to login
  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  // Skip expiry check if already on update page (avoids loop)
  if (location.pathname === "/update-credential") {
    return <Outlet />; // ✅ Render the page directly
  }

  // Password expiry check (only for other protected routes)
  const expiredAtRaw = user?.expiredAt;
  if (expiredAtRaw) {
    const expiredDate = new Date(expiredAtRaw);
    const now = new Date();
    const diffMs = now - expiredDate;
    const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (daysPassed > 90) {
      return <Navigate to="/update-credential" replace />;
    }
  }

  // All good -> render the protected route
  return <Outlet />;
};

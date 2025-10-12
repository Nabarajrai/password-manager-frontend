import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"; // ✅ Fixed import
// hooks
import { useVerifyToken } from "../hooks/verifyToken/VerifyToken";
import { useToast } from "../hooks/toast/useToast"; // ✅ Add if needed for errors (matching ProtectedRoute)
import Loading from "../components/loading/Loading"; // ✅ Add for consistency

export const PublicRoute = () => {
  const location = useLocation(); // ✅ Add to skip redirect on credential paths if needed
  const { showSuccessToast } = useToast(); // Optional: for error toasts
  const { data: user, isPending, isError, error } = useVerifyToken(); // ✅ Full destructuring for loading/error

  // Optional: Handle errors (e.g., invalid token)
  useEffect(() => {
    if (isError && error?.message) {
      showSuccessToast(error.message, "error");
    }
  }, [isError, error, showSuccessToast]);

  // While loading token verification
  if (isPending) {
    return <Loading />;
  }

  // If error, allow access (public routes should show even on auth failure)
  if (isError) {
    return <Outlet />;
  }

  // Skip redirect if on public credential pages (e.g., first-time setup)
  if (location.pathname === "/set-password") {
    // Adjust paths as needed (e.g., add "/reset-password" if required)
    return <Outlet />;
  }

  // If user authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Not authenticated -> render the public route
  return <Outlet />;
};

import { createBrowserRouter } from "react-router-dom"; // ✅ fixed
//routes
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

//pages
import LoginPage from "../pages/login/Login.page";
import DashboardPage from "../pages/dashboard/Dashboard.page";
import SignUpPage from "../pages/signup/SignUp.page";
import UpdateCredentail from "../pages/updateCredentail/UpdateCredentail";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import ResetPin from "../pages/resetPin/ResetPin";
import SetCrendentail from "../pages/setCrendentail/SetCrendentail";

export const routes = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/set-password", element: <UpdateCredentail /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/reset-pin", element: <ResetPin /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/update-credential", element: <SetCrendentail /> }, // ✅ fixed
    ],
  },
]);

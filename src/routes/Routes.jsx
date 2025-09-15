import { createBrowserRouter } from "react-router-dom"; // ✅ fixed
//routes
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

//pages
import LoginPage from "../pages/login/Login.page";
import DashboardPage from "../pages/dashboard/Dashboard.page";
import SignUpPage from "../pages/signup/SignUp.page";
import UpdateCredentail from "../pages/updateCredentail/UpdateCredentail";

export const routes = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/set-password", element: <UpdateCredentail /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/", element: <DashboardPage /> }],
  },
]);

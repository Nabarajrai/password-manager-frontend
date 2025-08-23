import { createBrowserRouter } from "react-router";
//routes
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

//pages
import LoginPage from "../pages/login/Login.page";
import DashboardPage from "../pages/dashboard/Dashboard.page";
import SignUpPage from "../pages/signup/SignUp.page";

export const routes = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/", element: <DashboardPage /> }],
  },
]);

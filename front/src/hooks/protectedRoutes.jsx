import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { userSession } = useAuthContext();

  // Check if the user is authenticated
  if (!userSession) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/sigin" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
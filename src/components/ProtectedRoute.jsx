/* eslint-disable react/prop-types */
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render child components if user is authenticated
  return children;
};

export default ProtectedRoute;

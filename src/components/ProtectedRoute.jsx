import { useAuth } from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

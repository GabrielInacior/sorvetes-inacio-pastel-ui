
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "cliente" | "funcionario" | "administrador";
}

const ProtectedRoute = ({ 
  children, 
  requiredRole = "funcionario" 
}: ProtectedRouteProps) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  
  // Check user role
  if (requiredRole === "administrador" && currentUser?.tipo !== "administrador") {
    // User is not an admin, redirect to home
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole === "funcionario" && 
      currentUser?.tipo !== "funcionario" && 
      currentUser?.tipo !== "administrador") {
    // User is not an employee or admin, redirect to home
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;

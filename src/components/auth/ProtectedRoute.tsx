
import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Show a loading state while auth is being checked
  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" tip="Authenticating..." />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to the login page, but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

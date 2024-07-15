import { Navigate } from "react-router-dom";
import { UserAuth } from "../../../../admin/src/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if the user is an admin
  if (!user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

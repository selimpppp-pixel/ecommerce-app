import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  
  if (!user) {
    return <Navigate to="/" />;
  }

  // ✅ لو فيه توكن → يدخل الصفحة
  return children;
}

export default ProtectedRoute;
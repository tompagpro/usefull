import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const userContext = useAuth();
  // console.log("IsLoggedIn ? :", userContext.isLoggedIn());
  return userContext.isLoggedIn() ? children : <Navigate to="/login" />;
}

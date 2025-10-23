import useUser from "../hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { isLogged } = useUser();
  const location = useLocation();
  const pathname = location.pathname;

  if (!isLogged && pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return children;
};

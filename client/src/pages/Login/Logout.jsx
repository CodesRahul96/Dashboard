import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";


export const Logout = () => {
  const { LogOutUser } = useAuth();
  useEffect(() => {
    LogOutUser();
    location.reload();
  }, [LogOutUser]);

  return <Navigate to="/login" />;
};

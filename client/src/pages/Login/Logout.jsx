import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

export const Logout = () => {
  const { LogOutUser } = useAuth();
  useEffect(() => {
    toast.info("Logout! 🙋‍♂️");
    LogOutUser();
  }, [LogOutUser]);

  return <Navigate to={`/login`} />;
};

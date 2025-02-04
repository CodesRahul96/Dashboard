import { useEffect } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

export const Logout = () => {
  const { LogOutUser } = useAuth();

  useEffect(() => {
    toast.info("Logout! 🙋‍♂️");
    LogOutUser();
    window.location.href = "/"; // Navigate using window.location.href
  }, [LogOutUser]);

  return null;
};

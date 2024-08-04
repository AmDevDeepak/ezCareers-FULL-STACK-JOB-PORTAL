import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectRecruiterRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
      toast.error("You cannot access this route.");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectRecruiterRoutes;

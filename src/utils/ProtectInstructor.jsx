import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectInstructor = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (user.isInstructor) {
    return children;
  }

  return <Navigate to={location.state?.from || "/"} />;
};

export default ProtectInstructor;

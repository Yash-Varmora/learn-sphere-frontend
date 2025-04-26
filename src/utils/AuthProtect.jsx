import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthProtect = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return children;
  }

  return <Navigate to={location.state?.from || "/"} />;
};

export default AuthProtect;

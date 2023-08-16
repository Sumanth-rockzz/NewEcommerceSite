import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  if (!isLoggedIn) {
    return <Navigate to="/login"></Navigate>;
  } else {
    return children;
  }
};

export default PrivateRoute;

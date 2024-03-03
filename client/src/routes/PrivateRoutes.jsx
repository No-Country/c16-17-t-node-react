import { Navigate } from "react-router-dom";
import { checkAuth } from '../services'

const PrivateRoute = ({ children }) => {
  const loged = checkAuth();
  

  if (loged) {
    return children;
  } else {
    return <Navigate to="/login"/>;
  }
};

export default PrivateRoute;

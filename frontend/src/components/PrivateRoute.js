import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("authToken"); 
  if (!token) {
    return <Navigate to="/login" />; 
  }
  return <Outlet />;
};

export default PrivateRoute;

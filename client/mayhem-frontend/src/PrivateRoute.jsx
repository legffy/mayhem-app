import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute(){
    const userToken = localStorage.getItem("token");
  return userToken ? <Outlet /> : <Navigate to="/front" replace />;
}
export default PrivateRoute;
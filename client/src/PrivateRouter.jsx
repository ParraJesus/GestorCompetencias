import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    alert("sesión expirada");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(decodedToken.tipo_usuario)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

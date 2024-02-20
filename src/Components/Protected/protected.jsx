import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login-admin-panel" replace />
  );
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ user, children }) {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

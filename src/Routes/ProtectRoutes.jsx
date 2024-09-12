import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ admin, children }) {
  if (admin) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

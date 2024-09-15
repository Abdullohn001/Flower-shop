import React from "react";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

export default function ProtectRoutes({ admin, children }) {
  if (admin) {
   return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     {children}
   </ThemeProvider>;
  } else {
    return <Navigate to="/login" />;
  }
}

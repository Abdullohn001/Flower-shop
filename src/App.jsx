import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectRoutes from "./Routes/ProtectRoutes";
import { useAppStore } from "./lib/zustand";

export default function App() {
  const admin = useAppStore((state) => state.admin)
  const routes = createBrowserRouter([
    {
      element: (
        <ProtectRoutes admin={admin}>
          <MainLayout />
        </ProtectRoutes>
      ),
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "login",
      element: admin ? <Navigate to="/" /> : <Login />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

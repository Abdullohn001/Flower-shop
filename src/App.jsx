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
  const user = useAppStore((state) => state.admin);
  const routes = createBrowserRouter([
    {
      element: (
        <ProtectRoutes user={user}>
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
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

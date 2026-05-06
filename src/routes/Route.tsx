import type { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ListOrder from "../components/pages/ListOrder/ListOrder.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <ListOrder />,
      </ProtectedRoute>
    ),
  },
];

export default routes;

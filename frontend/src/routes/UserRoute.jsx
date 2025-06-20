import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<UserLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

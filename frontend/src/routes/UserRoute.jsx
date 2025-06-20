import {Routes, Route} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "../components/common/ProtectedRoute"
import Login from "../pages/Login";

export default function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
          <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
}

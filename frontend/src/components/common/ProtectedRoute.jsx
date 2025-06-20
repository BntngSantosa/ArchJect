import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Anda harus login terlebih dahulu");
    return <Navigate to="/" replace />;
  } 

    return children;
}

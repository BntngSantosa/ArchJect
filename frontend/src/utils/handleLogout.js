import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function handleLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    // setTimeout(() => {
      toast.success("Logout success");
      navigate("/");
    // }, 1000);
  };

  return logout;
}

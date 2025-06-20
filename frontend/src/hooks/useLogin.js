import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login } from "../services/userService";
import { useState } from "react";

export default function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(values);
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      setTimeout(() => {
        if (data.user) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || toast.error("Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return {handleLogin, error, loading};
}

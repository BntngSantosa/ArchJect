import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { forgotPassword, getUserIdByEmail,  } from "../services/userService"; // pastikan dua fungsi terpisah di service
import { useState } from "react";

export default function useForgotPassword() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSearchEmail = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserIdByEmail(values.email);
      setUserFound(true);
      setEmail(values.email);
      toast.success(data.message || "User found");
    } catch (error) {
      toast.error(error?.data?.message || "User not found");
      setUserFound(false);
      setError(error?.data?.message || "Invalid email");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPassword({ email, Password: values.Password }); // kirim email & password
      toast.success(data.message || "Password updated successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error?.data?.message || "Filed to update password");
      setError(error?.data?.message || "Something wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSearchEmail,
    handleUpdatePassword,
    userFound,
    error,
    loading,
  };
}

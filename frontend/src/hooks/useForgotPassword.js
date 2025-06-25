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
      toast.success(data.message || "User ditemukan");
    } catch (error) {
      toast.error(error?.data?.message || "User tidak ditemukan");
      setError(error?.data?.message || "Email tidak valid");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPassword({ email, Password: values.Password }); // kirim email & password
      toast.success(data.message || "Password berhasil diubah");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error?.data?.message || "Gagal memperbarui password");
      setError(error?.data?.message || "Terjadi kesalahan");
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

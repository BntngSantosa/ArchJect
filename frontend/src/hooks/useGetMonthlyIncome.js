import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getMonthlyIncome } from "../services/projectService";

export default function useGetMonthlyIncome() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyIncome = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await getMonthlyIncome(token);
        setMonthlyData(response);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Gagal mengambil data pendapatan bulanan";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyIncome();
  }, []);

  return {
    monthlyData,
    loading,
    error,
  };
}

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getMonthlyProject } from "../services/projectService";

export default function useGetMonthlyProject() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await getMonthlyProject(token);
        setMonthlyData(response);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Gagal mengambil data project bulanan";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyProject();
  }, []);

  return {
    monthlyData,
    loading,
    error,
  };
}

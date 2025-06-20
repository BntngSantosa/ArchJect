import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCountProjects } from "../services/projectService";

export default function useGetCountProjects() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");

        const response = await getCountProjects(token);
        setCount(response);
      } catch (error) {
        const message =
          error.response?.data?.message || "Gagal mengambil jumlah proyek";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading, error };
}

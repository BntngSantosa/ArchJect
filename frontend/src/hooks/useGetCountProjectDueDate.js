import { getCountProjectDueDate } from "../services/projectService";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

export default function useGetCountProjectDueDate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchCount = useCallback(async () => {
    setLoading(true);
    setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await getCountProjectDueDate(token);
        setData(response);
      } catch (error) {
        const message =
          error.response?.data?.message || "Gagal mengambil jumlah proyek";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    },[]);
    useEffect(() => {
      fetchCount();
  }, [fetchCount]);

  return { data, loading, error, refetch: fetchCount };
}

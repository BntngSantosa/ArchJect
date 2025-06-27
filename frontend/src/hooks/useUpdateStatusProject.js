import { useState } from "react";
import { updateStatusProject } from "../services/projectService";
import toast from "react-hot-toast";

export default function useUpdateStatusroject(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateStatus = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const data = { status: "done" };
      await updateStatusProject(token, projectId, data);
      toast.success("Status updated successfully");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message);
      setError(error.response?.data?.message || "Filed to update status");
    } finally {
      setLoading(false);
    }
  };
  return { handleUpdateStatus, error, loading };
}

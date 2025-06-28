import { useState } from "react";
import { updateProject } from "../services/projectService";
import toast from "react-hot-toast";

export default function useUpdateProject(onSuccess, onSuccessNotif, onSuccessCountNotif) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateProjectHandler = async (projectId, data) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...data,
        income: Number(data.income),
        dueDate: new Date(data.dueDate).toISOString(),
      };
      await updateProject(token, projectId, payload);
      toast.success("Project updated successfully");
      if (onSuccess) onSuccess();
      if (onSuccessCountNotif) onSuccessCountNotif();
      if (onSuccessNotif) onSuccessNotif();
    } catch (error) {
      toast.error(error.response?.data?.message);
      setError(error.response?.data?.message || "Filed to update project");
    } finally {
      setLoading(false);
    }
  };
  return { handleUpdateProjectHandler, error, loading };
}

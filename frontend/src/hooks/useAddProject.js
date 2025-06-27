import { addProject } from "../services/projectService";
import toast from "react-hot-toast";

export const useAddProject = (onSuccess) => {
  const handleAddProjectHandler = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...data,
        income: Number(data.income),
        dueDate: new Date(data.dueDate).toISOString(),
      };

      const res = await addProject(token, payload);
      toast.success(res.message || "Added project successfully");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add project");
    }
  };

  return { handleAddProjectHandler };
};


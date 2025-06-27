import { deleteProject } from "../services/projectService";
import toast from "react-hot-toast";

export default function useDeleteProject(onSuccess) {
    const handleDeleteProject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await deleteProject(token, id);
            toast.success(res.message);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    return {handleDeleteProject}
}
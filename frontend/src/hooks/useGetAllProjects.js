import { useState } from "react";
import toast from "react-hot-toast";
import { getAllProjects } from "../services/projectService";

export const useGetAllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const useGetAllProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllProjects();
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            toast.error(error.response?.data?.message);
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { projects, loading, error, useGetAllProjects };
}
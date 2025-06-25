import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllProjects } from "../services/projectService";

export const useGetAllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGetAllProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await getAllProjects(token);
        setProjects(response);
      } catch (error) {
        toast.error(error.response?.data?.message);
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGetAllProjects();
  }, []);

  return { projects, loading, error };
};

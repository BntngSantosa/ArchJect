import { getProjectDueDate } from "../services/projectService";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function useGetAllProjectDueDate() {
    const [projectDueDate, setProjectDueDate] = useState([]);

    const getAllProjectDueDate = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await getProjectDueDate(token);
            setProjectDueDate(res.projects);
        } catch (error) {
            toast.error(error.message); 
        }
    }, []);

    useEffect(() => {
        getAllProjectDueDate();
    }, [getAllProjectDueDate]);

    return { projectDueDate, refetch: getAllProjectDueDate };
};
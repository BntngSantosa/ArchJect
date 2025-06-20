import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProjects = async (token) => {
    const res = await axios.get(`${API_URL}/projects`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });    
    return res.data;
}

export const getCountProjects = async (token) => {
    const res = await axios.get(`${API_URL}/projects/count`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });    
    return res.data;
}
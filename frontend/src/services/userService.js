import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/users/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


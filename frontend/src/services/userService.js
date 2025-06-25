import axios from "axios";
import { data } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/users/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getUserIdByEmail = async (email) => {
  const res = await axios.get(`${API_URL}/users/email/${email}`);
  return res.data;
};

export const forgotPassword = async (data) => {
  const res = await axios.put(`${API_URL}/users/forgot-password`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

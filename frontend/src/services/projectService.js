import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProjects = async (token) => {
  const res = await axios.get(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCountProjects = async (token) => {
  const res = await axios.get(`${API_URL}/projects/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCountProjectCompletion = async (token) => {
  const res = await axios.get(`${API_URL}/projects/completion`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCountProjectInProgress = async (token) => {
  const res = await axios.get(`${API_URL}/projects/inprogress`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getIncomeThisMonth = async (token) => {
  const res = await axios.get(`${API_URL}/projects/income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMonthlyIncome = async (token) => {
  const res = await axios.get(`${API_URL}/projects/monthly-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getNewProjectThisMonth = async (token) => {
  const res = await axios.get(`${API_URL}/projects/new-project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getProjectCompletedThisMonth = async (token) => {
  const res = await axios.get(`${API_URL}/projects/project-monthly-completed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMonthlyProject = async (token) => {
  const res = await axios.get(`${API_URL}/projects/monthly-project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addProject = async (token, data) => {
  const res = await axios.post(`${API_URL}/projects`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProject = async (token, id, data) => {
  const res = await axios.put(`${API_URL}/projects/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data;
}

export const updateStatusProject = async (token, id, data) => {
  const res = await axios.put(`${API_URL}/projects/status/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProject = async (token, id) => {
  const res = await axios.delete(`${API_URL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCountProjectDueDate = async (token) => {
  const res = await axios.get(`${API_URL}/projects/count-duedate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getProjectDueDate = async (token) => {
  const res = await axios.get(`${API_URL}/projects/duedate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
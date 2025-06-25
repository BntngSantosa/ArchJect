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

export const getCountProjectCompletion = async (token) => {
    const res = await axios.get(`${API_URL}/projects/completion`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });    
    return res.data;
} 

export const getCountProjectInProgress = async (token) => {
    const res = await axios.get(`${API_URL}/projects/inprogress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    
    return res.data;
}

export const getIncomeThisMonth = async (token) => {
    const res = await axios.get(`${API_URL}/projects/income`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    
    return res.data;
}

export const getMonthlyIncome = async (token) => {
  const res = await axios.get(`${API_URL}/projects/monthly-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });    
  return res.data;
}

export const getNewProjectThisMonth = async (token) => {
  const res = await axios.get(`${API_URL}/projects/new-project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });    
  return res.data;
}

export const getProjectCompletedThisMonth = async (token) => {
  const res = await axios.get(`${API_URL}/projects/project-monthly-completed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });    
  return res.data;
}

export const getMonthlyProject = async (token) => {
  const res = await axios.get(`${API_URL}/projects/monthly-project`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });    
  return res.data;
}
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (name, email, password, password_confirmation) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    password_confirmation
  });
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, {
    email
  });
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
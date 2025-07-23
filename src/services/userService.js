import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/user`, authHeaders());
  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await axios.post(`${API_URL}/user/update`, formData, authHeaders());
  return response.data;
};
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const createCapsule = async (formData) => {
  const response = await axios.post(`${API_URL}/capsules`, formData, authHeaders());
  return response.data;
};

export const getUserCapsules = async () => {
  const response = await axios.get(`${API_URL}/capsules`, authHeaders());
  return response.data;
};

export const getCapsuleById = async (id) => {
  const response = await axios.get(`${API_URL}/capsules/${id}`, authHeaders());
  return response.data;
};

export const updateCapsule = async (id, formData) => {
  const response = await axios.post(`${API_URL}/capsules/${id}/update`, formData, authHeaders());
  return response.data;
};

export const deleteCapsule = async (id) => {
  const response = await axios.post(`${API_URL}/capsules/${id}/delete`, {}, authHeaders());
  return response.data;
};

export const filterWallCapsules = async (filters = {}) => {
  const response = await axios.get(`${API_URL}/wall`, { params: filters });
  return response.data;
};

export const getSharedCapsule = async (token) => {
  const response = await axios.get(`${API_URL}/capsule/share/${token}`);
  return response.data;
};
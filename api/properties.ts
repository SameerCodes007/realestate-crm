import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProperties = async (type: string) => {
  try {
    const { data } = await api.get(`/properties/${type}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.error || 'Failed to fetch properties' };
  }
};

export const createProperty = async (type: string, property: any) => {
  try {
    const { data } = await api.post(`/properties/${type}`, property);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.error || 'Failed to create property' };
  }
};

export const updateProperty = async (type: string, id: string, property: any) => {
  try {
    const { data } = await api.put(`/properties/${type}/${id}`, property);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.error || 'Failed to update property' };
  }
};

export const deleteProperty = async (type: string, id: string) => {
  try {
    await api.delete(`/properties/${type}/${id}`);
    return { error: null };
  } catch (error) {
    return { error: error.response?.data?.error || 'Failed to delete property' };
  }
};
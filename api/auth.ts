import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.error || 'Login failed' };
  }
};
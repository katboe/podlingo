import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Remove the token interceptor since we're using HTTP-only cookies
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Don't remove userData or redirect, let the UserContext handle it
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
); 
import axios from 'axios';

// Store the authorization value
let authValue: string | null = null;

// Function to set the authorization value
export const setAuthValue = (value: string) => {
  authValue = value;
};

// Function to get the authorization value
export const getAuthValue = (): string | null => {
  return authValue;
};

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'https://navtrack-edge-production.up.railway.app',
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // If auth value exists, add it to the headers
    if (authValue) {
      config.headers.Authorization = `Bearer ${authValue}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear the auth value
      authValue = null;
      // You might want to redirect to login or show an error message here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

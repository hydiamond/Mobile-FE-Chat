import axios from 'axios';
import asyncStorage from './asyncStorage';

const axiosApiInstance = axios.create({
  baseURL: 'https://api-chat.ga/api/v0/'
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await asyncStorage.getAccessToken();
    console.log(token);
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err);
  }
);

export default axiosApiInstance;

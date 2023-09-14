import axios from 'axios';
import { logoutUser } from './auth';

export const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api'
    : 'https://twitter-backend-zegv.onrender.com/api';

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      logoutUser();
      window.location.href = '/signin';
      return;
    }

    return Promise.reject(error);
  }
);

export default axios;

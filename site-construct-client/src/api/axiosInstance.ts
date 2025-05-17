import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://94.190.123.143:80/api/v1',
  timeout: 10000,
  //withCredentials: true,
});

export default axiosInstance;

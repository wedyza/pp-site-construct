import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://188.68.80.72/api/v1',
    timeout: 10000,
});

export default axiosInstance;

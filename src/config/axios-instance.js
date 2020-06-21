import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.GATSBY_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus(status) {

    return status >= 200 && status < 500;

  },
});

export default axiosInstance;

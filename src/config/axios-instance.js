import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.GATSBY_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus(status) {

    return status >= 200 && status < 500;

  },
});

export default instance;

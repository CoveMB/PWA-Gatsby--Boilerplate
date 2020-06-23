import axios from 'axios';

// Instantiate axios instance with backend of the app as default baseUrl
const internalInstance = axios.create({
  baseURL: process.env.GATSBY_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus(status) {

    return status >= 200 && status < 500;

  },
});

// Instantiate axios instance with backend of the app as default baseUrl
const externalInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus(status) {

    return status >= 200 && status < 500;

  },
});

export default {
  internalInstance,
  externalInstance
};

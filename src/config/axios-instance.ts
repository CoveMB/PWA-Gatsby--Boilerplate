import axios from 'axios';
import { ApiEndpoint } from './constants';

// Instantiate axios instance with backend of the app as default baseUrl
const internalInstance = axios.create({
  baseURL        : ApiEndpoint,
  withCredentials: true,
  headers        : {
    'Content-Type': 'application/json',
  },

  // For the internal api call we dont want to throw error on 400's errors
  validateStatus(status) {

    return status >= 200 && status < 500;

  },
});

// Instantiate axios instance with backend of the app as default baseUrl
const externalInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },

  // For the external api call we throw error on any error code superior to 400
  validateStatus(status) {

    return status >= 200 && status < 400;

  },
});

export default {
  internalInstance,
  externalInstance
};

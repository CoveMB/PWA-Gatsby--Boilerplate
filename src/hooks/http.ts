import { AxiosResponse } from 'axios';
import axios from 'config/axios-instance';
import getCSRF from 'config/config-csrf';
import { AccessToken } from 'config/constants';
// eslint-disable-next-line import/no-cycle
import { AuthContext } from 'contexts/auth';
import {
  Reducer, useCallback, useContext, useEffect, useReducer
} from 'react';
import {
  ExecuteRequest, HttpAction, HttpRequestParams, HttpState, UseHttp
} from 'types';

// Initial state for Component using the http hook
const initialState = {
  loading: false,
  error  : '',
  data   : {}
};

// Reducer defining actions
const httpReducer: Reducer<HttpState, HttpAction> = (
  curHttpState, { type, errorMessage, responseData }
) => {

  switch (type) {

    // The request is starting
    case 'SEND':
      return {
        ...curHttpState,
        loading: true,
        error  : '',
        data   : {}
      };

    // The response came back
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data   : responseData,
      };

    // An error occurred
    case 'ERROR':
      return {
        ...curHttpState,
        loading: false,
        error  : errorMessage
      };

    // Clear the state
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('An error occurred fetching data');

  }

};

// If initialRequest is passed during initialisation of the hook a request will be made at the render of it's component
const useHttp: UseHttp = (initialRequest) => {

  // Create a state with reducer
  const [ httpState, dispatchHttp ] = useReducer(httpReducer, initialState);

  // If the is logged in the cookie will identified him or her
  // else we identified the client app in the Authorization header
  const { isAuthenticated } = useContext(AuthContext);

  const authorizationHeader = isAuthenticated ? {} : { Authorization: `Bearer ${AccessToken}` };

  const clearHttpState = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const executeRequest: ExecuteRequest = async ({

    // The method accept an url, a method a body and headers to make the request, and the axios instance type
    url, method, body, headers
  }, axiosInstance) => axios[axiosInstance]({
    method,
    url,
    data   : body,
    headers: {
      ...headers,

      // Add csrf token to be validated in the backend
      'csrf-token': await getCSRF(),
      ...authorizationHeader
    }
  });

  // Defined the fetch method
  const sendRequest = useCallback(

    // The method accept an url, a method a body and headers to make the request, and if the request is external
    async <M>(requestParameters: HttpRequestParams, external = false
    ): Promise<AxiosResponse<M>> => {

      try {

        let response;

        dispatchHttp({
          type: 'SEND'
        });

        // If the request should be external the external axios instance with no baseurl will be use
        if (external) {

          // Request is make here with the passed parameter with the external axios instance that do not have a base url
          response = await executeRequest<M>(requestParameters, 'externalInstance');

        } else {

          // Request is make here with the passed parameter with the internal axios instance that has a base url of the app backend
          response = await executeRequest<M>(requestParameters, 'internalInstance');

        }

        // We can set up custom logic for authentication errors from our api endpoints external api call will throw an error on a response code superior to 400
        if (response.status >= 400) {

          dispatchHttp({
            type        : 'ERROR',
            errorMessage: response.data.message
          });

        } else if (response.status < 400) {

          // The request was successful, the data is made available to the Component
          dispatchHttp({
            type        : 'RESPONSE',
            responseData: response.data
          });

        }

        // Return the response
        return response;

      } catch (error) {

        // Make error available to Component
        dispatchHttp({
          type        : 'ERROR',
          errorMessage: 'Oups, something went wrong'
        });

        return error;

      }

    }, []
  );

  useEffect(() => {

    // If initialRequest is passed during initialisation of the hook a request will be made at the render of it's component
    if (initialRequest) {

      sendRequest(initialRequest);

    }

  }, []);

  return {
    isLoading: httpState.loading,
    httpData : httpState.data,
    httpError: httpState.error,
    sendRequest,
    clearHttpState
  };

};

export default useHttp;

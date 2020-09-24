import axios from 'config/axios-instance';
import { AuthContext } from 'contexts/auth';
import { useCallback, useContext, useEffect, useReducer } from 'react';

// Initial state for Component using the http hook
const initialState = {
  loading: false,
  error  : '',
  data   : {}
};

// Reducer defining actions
const httpReducer = (curHttpState, action) => {

  switch (action.type) {

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
        data   : action.responseData
      };

    // An error occurred
    case 'ERROR':
      return {
        ...curHttpState,
        loading: false,
        error  : action.errorMessage
      };

    // Clear the state
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('An error occurred fetching data');

  }

};

// If initialRequest is passed during initialisation of the hook a request will be made at the render of it's component
const useHttp = (initialRequest) => {

  // Create a state with reducer
  const [ httpState, dispatchHttp ] = useReducer(httpReducer, initialState);

  // If the AuthContext contains an authToken it will be included in the headers
  const { authToken } = useContext(AuthContext);

  const clearHttpState = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const executeRequest = async ({

    // The method accept an url, a method a body and headers to make the request, and the axios instance type
    url, method, body, headers
  }, axiosInstance, token) => axios[axiosInstance]({
    method,
    url,
    data   : body,
    headers: {

      // If the AuthContext contains an authToken it will be included in the headers
      Authorization: `Bearer ${token || process.env.GATSBY_ACCESS_TOKEN}`,
      ...headers
    }
  });

  // Defined the fetch method
  const sendRequest = useCallback(

    // The method accept an url, a method a body and headers to make the request, and if the request is external
    async (requestParameters, external = false
    ) => {

      try {

        let response;

        dispatchHttp({
          type: 'SEND'
        });

        // If the request should be external the external axios instance with no baseurl will be use
        if (external) {

          // Request is make here with the passed parameter with the external axios instance that do not have a base url
          response = await executeRequest(requestParameters, 'externalInstance', authToken.token);

        } else {

          // Request is make here with the passed parameter with the internal axios instance that has a base url of the app backend
          response = await executeRequest(requestParameters, 'internalInstance', authToken.token);

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

    }, [ authToken ]
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

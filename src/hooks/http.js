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

  // Defined the fetch method
  const sendRequest = useCallback(
    async ({

      // The method accept an url, a method a body and headers to make the request, and if the request is external
      url, method, body, headers, external = false
    }) => {

      try {

        let response;

        dispatchHttp({
          type: 'SEND'
        });

        // If the request should be external the external axios instance with no baseurl will be use
        if (external) {

          // Request is make here with the passed parameter
          response = await axios.externalInstance({
            method,
            url,
            data   : JSON.stringify(body),
            headers: {

              // If the AuthContext contains an authToken it will be included in the headers
              Authorization: `Bearer ${authToken.token || 'no token'}`,
              ...headers
            }
          });

        } else {

          // Request is make here with the passed parameter
          response = await axios.internalInstance({
            method,
            url,
            data   : JSON.stringify(body),
            headers: {

              // If the AuthContext contains an authToken it will be included in the headers
              Authorization: `Bearer ${authToken.token || 'no token'}`,
              ...headers
            }
          });

        }

        // The axios instance is set not to throw an error on status under 500
        // We can set up custom logic for authentication errors
        if (response.status >= 400) {

          dispatchHttp({
            type        : 'ERROR',
            errorMessage: response.data.message
          });

        } else {

          // Make the data available to the Component
          dispatchHttp({
            type        : 'RESPONSE',
            responseData: response.data
          });

        }

        // Return the requested data
        return response.data;

      } catch (error) {

        // Make error available to Component
        dispatchHttp({
          type        : 'ERROR',
          errorMessage: 'Oups, something went wrong!'
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

  }, [ sendRequest ]);

  return {
    isLoading: httpState.loading,
    httpData : httpState.data,
    httpError: httpState.error,
    sendRequest,
    clearHttpState
  };

};

export default useHttp;

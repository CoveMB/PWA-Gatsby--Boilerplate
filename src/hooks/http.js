import { useReducer, useCallback } from 'react';
import axios from 'config/axios-instance';

const initialState = {
  loading: false,
  error  : '',
  data   : {}
};

const httpReducer = (curHttpState, action) => {

  switch (action.type) {

    case 'SEND':
      return {
        ...curHttpState,
        loading: true,
        error  : '',
        data   : {}
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data   : action.responseData
      };
    case 'ERROR':
      return {
        ...curHttpState,
        loading: false,
        error  : action.errorMessage
      };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('An error occurred fetching data');

  }

};

const useHttp = () => {

  const [ httpState, dispatchHttp ] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback(
    async ({ url, method, body }) => {

      try {

        dispatchHttp({
          type: 'SEND'
        });

        const response = await axios({
          method,
          url,
          data: JSON.stringify(body),
        });

        if (response.status >= 400) {

          dispatchHttp({
            type        : 'ERROR',
            errorMessage: response.data.message
          });

        } else {

          dispatchHttp({
            type        : 'RESPONSE',
            responseData: response.data
          });

        }

        return response.data;

      } catch (error) {

        dispatchHttp({
          type        : 'ERROR',
          errorMessage: 'Something went wrong!'
        });

        return error;

      }

    }, []
  );

  return {
    isLoading: httpState.loading,
    httpData : httpState.data,
    httpError: httpState.error,
    sendRequest,
    clear
  };

};

export default useHttp;

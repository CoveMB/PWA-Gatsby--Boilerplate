import axios from 'config/axios-instance';
import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useStore } from 'store/useStore';

// Initial auth context
const initialState = {
  user           : {},
  isAuthenticated: false,
  authToken      : {
    token: '', expiration: ''
  },
};

//  Launching the app we get eventual tokens stored in local storage
const stateFromLocalStorage = () => {

  let storedState = {};

  if (typeof localStorage !== 'undefined') {

    const storedAuth = JSON.parse(localStorage.getItem('auth') || '{}');
    const { token, user } = storedAuth;

    if (token && token.token) {

      storedState = {
        user,
        isAuthenticated: true,
        authToken      : {
          token: token.token, expiration: new Date(token.expiration)
        },
      };

    } else {

      localStorage.removeItem('auth');

    }

  }

  return {
    ...initialState,
    ...storedState
  };

};

export const AuthContext = createContext(stateFromLocalStorage());

const AuthContextProvider = ({ children }) => {

  const [ authState, setAuthState ] = useState(stateFromLocalStorage());
  const dispatch = useStore()[1];

  const setToken = ({ user, token }) => {

    const authToStore = {
      token,
      user,
    };

    localStorage.setItem('auth', JSON.stringify(authToStore));

    setAuthState({
      authToken: token, isAuthenticated: true
    });

    dispatch('SET_USER', user);

  };

  const logOut = useCallback(async (token, revoke = false) => {

    if (revoke) {

      await axios({
        url   : '/logout',
        method: 'POST',
      });

    }

    localStorage.removeItem('auth');
    setAuthState(initialState);
    dispatch('SET_USER', {});

  }, [ dispatch ]);

  useEffect(() => {

    (async () => {

      try {

        const { authToken, user } = authState;
        const { token, expiration } = authToken;

        if (token && expiration > new Date()) {

          const check = await axios({
            url    : '/check-token',
            method : 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (check.status === 200) {

            dispatch('SET_USER', user);

          } else {

            await logOut(token);

          }

        } else if (expiration
          && expiration < new Date()) {

          await logOut(token, true);

        }

      } catch (error) {

        await logOut();

      }

    })();

  }, [
    authState,
    logOut,
    dispatch
  ]);

  return (
    <AuthContext.Provider value={{
      ...authState, setToken, logOut
    }}
    >
      {children}
    </AuthContext.Provider>
  );

};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'config/axios-instance';

const initialState = {
  user           : {},
  isAuthenticated: false,
  token          : '',
};

const getDefaultState = () => {

  let storedState = {};

  if (typeof localStorage !== 'undefined') {

    const storedAuth = JSON.parse(localStorage.getItem('auth') || '{}');

    if (storedAuth.token && new Date(storedAuth.expiry) > new Date()) {

      storedState = {
        user           : storedAuth.user,
        isAuthenticated: true,
        token          : storedAuth.token
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

export const AuthContext = createContext(getDefaultState());

const AuthContextProvider = ({ children }) => {

  const [ authState, setAuthState ] = useState(getDefaultState());

  const logOut = async (revoke = false) => {

    if (revoke) {

      await axios({
        url    : '/logout',
        method : 'POST',
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });

    }

    localStorage.removeItem('auth');
    setAuthState(initialState);

  };

  useEffect(() => {

    (async () => {

      try {

        if (authState.token) {

          const check = await axios({
            url    : '/check-token',
            method : 'POST',
            headers: {
              Authorization: `Bearer ${authState.token}`
            }
          });

          if (check.status !== 200) {

            await logOut();

          }

        }

      } catch (error) {

        await logOut();

      }

    })();

  }, []);

  const setToken = ({ user, token }) => {

    const date = new Date();

    const authToStore = {
      token,
      user,
      expiry: new Date(date.setMonth(date.getMonth() + 4))
    };

    localStorage.setItem('auth', JSON.stringify(authToStore));

    setAuthState({
      user, token, isAuthenticated: true
    });

  };

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

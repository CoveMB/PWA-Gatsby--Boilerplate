import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const getDefaultState = () => {

  const DEFAULT_STATE = {
    user           : {},
    isAuthenticated: false,
    token          : '',
    expiresAt      : null
  };

  let storedState = {};

  if (typeof localStorage !== 'undefined') {

    const expiresAt = new Date(
      JSON.parse(localStorage.getItem('auth:expires_at') || '0')
    );

    const token = JSON.parse(localStorage.getItem('auth:token') || '""');

    if (token && expiresAt > new Date()) {

      // TODO validate token api call

      storedState = {
        user           : JSON.parse(localStorage.getItem('auth:user') || '{}'),
        isAuthenticated: true,
        token,
        expiresAt,
      };

    } else if (token) {

      localStorage.removeItem('auth:user');
      localStorage.removeItem('auth:token');
      localStorage.removeItem('auth:expires_at');

    }

  }

  return {
    ...DEFAULT_STATE,
    ...storedState
  };

};

export const AuthContext = createContext(getDefaultState());

const AuthContextProvider = ({ children }) => {

  const [ authState, setAuthState ] = useState(getDefaultState());

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );

};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;

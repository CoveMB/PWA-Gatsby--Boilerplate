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

//  Launching the app we get eventual tokens stored in local storage to load in the auth context
const stateFromLocalStorage = () => {

  let storedState = {};

  // Check if local storage is available
  if (typeof localStorage !== 'undefined') {

    // Get the auth storage
    const storedAuth = JSON.parse(localStorage.getItem('auth') || '{}');
    const { token, user } = storedAuth;

    // If there is a token in the auth load it in the state with the user
    if (token && token.token) {

      storedState = {
        user,
        isAuthenticated: true,
        authToken      : {
          token: token.token, expiration: new Date(token.expiration)
        },
      };

    } else {

      // If no token if found clean storage
      localStorage.removeItem('auth');

    }

  }

  return {
    ...initialState,
    ...storedState
  };

};

// The context is loaded from state found in local storage
export const AuthContext = createContext(stateFromLocalStorage());

const AuthContextProvider = ({ children }) => {

  const [ authState, setAuthState ] = useState(stateFromLocalStorage());
  const dispatch = useStore()[1];

  const updateStateAndStore = (user, { token, expiration }) => {

    // Set the auth state
    setAuthState({
      authToken: {
        token, expiration: new Date(expiration)
      },
      isAuthenticated: true
    });

    // Set the user un the app store
    dispatch('SET_USER', user);

  };

  const setToken = ({ user, token }) => {

    // Store the token and user in local storage
    localStorage.setItem('auth', JSON.stringify({
      user,
      token,
    }));

  };

  // Set token will store the token and user in local storage and set the state and app store
  const logIn = ({ user, token }) => {

    setToken({
      user, token
    });

    // Update state of the app
    updateStateAndStore(user, token);

  };

  // Log out will remove tokens in the local storage eventually revoking in in the back end as well
  const logOut = useCallback(async (token, revoke = false) => {

    if (revoke) {

      await axios.internalInstance({
        url   : '/logout',
        method: 'POST',
      });

    }

    // Remove data from local storage
    localStorage.removeItem('auth');

    // Set the auth state back to it's original state
    setAuthState(initialState);

    // Remove user from the state
    dispatch('SET_USER', {});

  }, [ dispatch ]);

  // At the beginning og the app we revalidate the token, in case it may have had expired
  useEffect(() => {

    (async () => {

      try {

        const { authToken, user } = authState;
        const { token, expiration } = authToken;

        // If there is a token and it is not expired
        if (token && expiration > new Date()) {

          // Check the token in the backend
          const check = await axios.internalInstance({
            url    : '/check-token',
            method : 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (check.status === 200) {

            // If it is okay we can load the user to the store
            dispatch('SET_USER', user);

          } else {

            // Else the token was not valid so we log the user out
            await logOut(token);

          }

        } else {

          // Else the token is invalid or expired so we log the user out
          await logOut(token);

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
      ...authState, logIn, logOut
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

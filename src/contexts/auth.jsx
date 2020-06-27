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

  const updateStateAndStore = useCallback((user, newAuthState = false) => {

    if (newAuthState) {

      // Set the auth state
      setAuthState(newAuthState);

    }

    if (user) {

      // Set the user un the app store
      dispatch('SET_USER', user);

    }

  }, [ dispatch ]);

  const setToken = ({ user, token }) => {

    // Store the token and user in local storage
    localStorage.setItem('auth', JSON.stringify({
      user,
      token,
    }));

  };

  const unsetToken = () => {

    // Remove token from local storage
    localStorage.removeItem('auth');

  };

  // Set token will store the token and user in local storage and set the state and app store
  const logIn = ({ user, token }) => {

    setToken({
      user, token
    });

    // Update state of the app
    updateStateAndStore(user, {
      authToken: {
        token: token.token, expiration: new Date(token.expiration)
      },
      isAuthenticated: true
    });

  };

  // Log out will can logout user from the app and revoke a token in the backend
  const logOut = useCallback(async ({ tokenToRevoke, logOutUser, authToken }) => {

    // If a token to revoke is pass to the function it will be send to the backend
    if (tokenToRevoke) {

      await axios.internalInstance({
        url   : '/logout',
        method: 'POST',

        // The token to be revoked is ent
        data   : { token: tokenToRevoke },
        headers: {

          // The endpoint is protected so we need to authenticate
          // either with the authToken if we are not the revoking the token use for the actual session authentication
          // If we are revoking an other token the actual session's token should be contained in authToken
          Authorization: `Bearer ${authToken || tokenToRevoke}`,
        }
      });

    }

    // If logOutUser is set to tru we log the user out of the app
    if (logOutUser) {

      // Remove token from local storage
      unsetToken();

      // Update state of the app
      updateStateAndStore({}, initialState);

    }

  }, [ updateStateAndStore ]);

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
            updateStateAndStore(user);

          } else {

            // Else the token was not valid so we log the user out
            await logOut({ logOutUser: true });

          }

        } else {

          // Else the token expired so we log the user out
          await logOut({
            logOutUser   : true,
            tokenToRevoke: token
          });

        }

      } catch (error) {

        await logOut();

      }

    })();

  }, [
    updateStateAndStore,
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

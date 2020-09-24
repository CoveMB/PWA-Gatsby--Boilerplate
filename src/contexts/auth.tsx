import axiosInstance from 'config/axios-instance';
import getCSRF from 'config/config-csrf';
import Cookie from 'js-cookie';
import PropTypes, { InferProps } from 'prop-types';
import React, {
  createContext, ReactElement, useCallback, useEffect, useState
} from 'react';
import { useStore } from 'store/useStore';
import {
  AuthContextState, AuthContextType, Login, LogOut, RemoveUserCookie
} from 'types';
import { isBrowser } from 'utils';

// Initial auth context
const initialState = {
  user: {
    uuid : '',
    admin: false,
  },
  isAuthenticated: false
};

//  Launching the app we get eventual tokens stored in local storage to load in the auth context
const stateFromCookie = (): AuthContextState => {

  let storedState = {};

  // Get the auth storage
  const storedUser = isBrowser() && JSON.parse(Cookie.get('app.user') || '""');

  // If there is a token in the auth load it in the state with the user
  if (storedUser) {

    storedState = {
      user           : storedUser,
      isAuthenticated: true,
    };

  }

  return {
    ...initialState,
    ...storedState
  };

};

// The context is loaded from state found in local storage
export const AuthContext = createContext<
AuthContextType
>(stateFromCookie() as AuthContextType);

export default function AuthContextTypeProvider(
  { children }: InferProps<typeof AuthContextTypeProvider.propTypes>
): ReactElement {

  const [ authState, setAuthState ] = useState(stateFromCookie());
  const dispatch = useStore()[1];

  const updateStateAndStore = useCallback((user, newAuthState = false) => {

    if (newAuthState) {

      // Set the auth state
      setAuthState(newAuthState);

    }

    if (user) {

      // Set the user in the app store
      dispatch('SET_USER', user);

    }

  }, [ dispatch ]);

  const removeUserCookie: RemoveUserCookie = () => {

    Cookie.remove('app.user');
    Cookie.remove('app.user.sig');

  };

  // Set token will store the token and user in local storage and set the state and app store
  const logIn: Login = ({ user }) => {

    // Update state of the app
    updateStateAndStore(user, {
      user,
      isAuthenticated: true
    });

  };

  // Log out will can logout user from the app and revoke a token in the backend
  const logOut: LogOut = useCallback(async ({ tokenToRevoke, logOutUser }) => {

    // If a token to revoke is pass to the function it will be send to the backend
    if (tokenToRevoke) {

      await axiosInstance.internalInstance({
        url    : '/logout',
        method : 'DELETE',
        headers: {
          'csrf-token': await getCSRF(),
        },

        // The token to be revoked is sent
        data: { token: tokenToRevoke },
      });

    } else {

      // The auth token in the cookie will be revoked
      await axiosInstance.internalInstance({
        url    : '/logout',
        method : 'DELETE',
        headers: {
          'csrf-token': await getCSRF(),
        },
      });

    }

    // If logOutUser is set to tru we log the user out of the app
    if (logOutUser) {

      // Remove token from local storage
      removeUserCookie();

      // Update state of the app
      updateStateAndStore({}, initialState);

    }

  }, [ updateStateAndStore ]);

  // At the beginning og the app we revalidate the token, in case it may have had expired
  useEffect(() => {

    (async () => {

      try {

        const { user, isAuthenticated } = authState;

        // If there is a token and it is not expired
        if (isAuthenticated) {

          // Check the token in the backend
          const check = await axiosInstance.internalInstance({
            url    : '/check-token',
            method : 'GET',
            headers: {
              'csrf-token': await getCSRF(),
            },
          });

          if (check.status === 200) {

            // If it is okay we can load the user to the store
            updateStateAndStore(user);

          } else {

            // Else the token was not valid so we log the user out
            await logOut({ logOutUser: true });

          }

        }

      } catch (error) {

        await logOut({ logOutUser: true });

      }

    })();

  }, [ ]);

  return (
    <AuthContext.Provider value={{
      ...authState, logIn, logOut
    }}
    >
      {children}
    </AuthContext.Provider>
  );

}

AuthContextTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

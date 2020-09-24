import AuthContextProvider from 'contexts/auth';
import PropTypes from 'prop-types';
import React from 'react';
import 'config/config-csrf';
import { configureUserDataStore, configureUserStore } from 'store';

// Configure stores
configureUserStore();
configureUserDataStore();

// Wrap the app in the AuthContext
export const wrapRootElement = ({ element }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <AuthContextProvider>
    {element}
  </AuthContextProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};

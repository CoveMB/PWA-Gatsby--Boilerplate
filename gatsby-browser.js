import AuthContextProvider from 'contexts/auth';
import PropTypes from 'prop-types';
import React from 'react';
import configureRefStore from 'store/userStore';

// Configure stores
configureRefStore();

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

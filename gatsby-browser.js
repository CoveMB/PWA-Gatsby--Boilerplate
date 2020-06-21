import AuthContextProvider from 'contexts/auth';
import React from 'react';
import configureRefStore from 'store/userStore';

configureRefStore();

export const wrapRootElement = ({ element }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <AuthContextProvider>
    {element}
  </AuthContextProvider>
);

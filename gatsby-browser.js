import React from 'react';
import AuthContextProvider from 'contexts/auth';

export const wrapRootElement = ({ element }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <AuthContextProvider>
    {element}
  </AuthContextProvider>
);

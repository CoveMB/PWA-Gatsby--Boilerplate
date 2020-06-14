/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { AuthContext } from 'contexts/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => {

  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated && location.pathname !== '/login') {

    navigate('/login');

    return null;

  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...rest} />;

};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateRoute;

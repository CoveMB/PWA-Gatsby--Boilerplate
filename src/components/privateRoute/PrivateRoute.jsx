/* eslint-disable react/prop-types */
import { AuthContext } from 'contexts/auth';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

const PrivateRoute = ({ component: Component, location, ...rest }) => {

  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated && location.pathname !== '/login') {

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

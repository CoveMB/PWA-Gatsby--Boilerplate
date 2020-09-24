/* eslint-disable react/require-default-props */
import { AuthContext } from 'contexts/auth';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

// The private route will be protected under authentication
const PrivateRoute = ({ component: Component, location, ...rest }) => {

  // Get if the user is authenticated from auth context
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated && location.pathname !== '/login') {

    // If the user is not authenticated redirect to the login page
    navigate('/login');

    return null;

  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...rest} />;

};

PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.elementType.isRequired
};

export default PrivateRoute;

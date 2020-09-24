/* eslint-disable react/require-default-props */
import { AuthContext } from 'contexts/auth';
import { navigate } from 'gatsby';
import PropTypes, { InferProps, Validator } from 'prop-types';
import React, { ElementType, ReactElement, useContext } from 'react';

// The private route will be protected under authentication
export default function PrivateRoute(
  { component: Component, location, ...rest }: InferProps<typeof PrivateRoute.propTypes>
): ReactElement | null {

  // Get if the user is authenticated from auth context
  const { isAuthenticated } = useContext(AuthContext);

  // The location will be present
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!isAuthenticated && location.pathname !== '/login') {

    // If the user is not authenticated redirect to the login page
    navigate('/login');

    return null;

  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...rest} />;

}

PrivateRoute.propTypes = {
  path    : PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }) as Validator<Location>,
  component: PropTypes.elementType.isRequired as Validator<ElementType>
};

PrivateRoute.defaultProps = {
  location: {},
};

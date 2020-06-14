import React from 'react';
import { Link } from 'gatsby';
import { NavLink } from 'styles/links';

const LoggedOut = () => (

  <Link to="/login/">
    <NavLink>
      Login
    </NavLink>
  </Link>

);

export default LoggedOut;

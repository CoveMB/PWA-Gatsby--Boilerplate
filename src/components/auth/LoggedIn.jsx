import React from 'react';
import { NavLink } from 'styles/links';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Div = styled.div`
  display: flex;
`;

const LoggedIn = () => (
  <>
    <Div>
      <Link to="/app/profile/">
        <NavLink>
          Profile
        </NavLink>
      </Link>
      <NavLink>
        Logout
      </NavLink>
    </Div>
  </>

);

export default LoggedIn;

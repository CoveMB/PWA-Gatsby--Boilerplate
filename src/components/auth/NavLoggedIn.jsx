import React, { useContext } from 'react';
import { NavLink } from 'styles/links';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { AuthContext } from 'contexts/auth';

const Div = styled.div`
  display: flex;
`;

const LoggedIn = () => {

  const { logOut } = useContext(AuthContext);

  return (
    <Div>
      <Link to="/app/profile/">
        <NavLink>
          Profile
        </NavLink>
      </Link>
      <NavLink onClick={async () => logOut(true)}>
        Logout
      </NavLink>
    </Div>
  );

};

export default LoggedIn;

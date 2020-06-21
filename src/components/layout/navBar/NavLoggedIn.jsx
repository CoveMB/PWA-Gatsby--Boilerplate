import { AuthContext } from 'contexts/auth';
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'styles/links';

const Div = styled.div`
  display: flex;
`;

const LoggedIn = () => {

  const { logOut, token } = useContext(AuthContext);

  return (
    <Div>
      <Link to="/app/profile">
        <NavLink>
          Profile
        </NavLink>
      </Link>
      <NavLink onClick={async () => logOut(token, true)}>
        Logout
      </NavLink>
    </Div>
  );

};

export default LoggedIn;

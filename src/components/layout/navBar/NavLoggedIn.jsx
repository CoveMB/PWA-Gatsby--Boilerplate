import { AuthContext } from 'contexts/auth';
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'styles/links';

const Div = styled.div`
  display: flex;
`;

// The navbar shown if you are logged in
const LoggedIn = () => {

  const { logOut, authToken } = useContext(AuthContext);
  const { token } = authToken;

  return (
    <Div>
      <Link to="/app/profile">
        <NavLink>
          Profile
        </NavLink>
      </Link>
      <NavLink onClick={() => logOut(
        {
          tokenToRevoke: token,
          logOutUser   : true,
        }
      )}
      >
        Logout
      </NavLink>
    </Div>
  );

};

export default LoggedIn;

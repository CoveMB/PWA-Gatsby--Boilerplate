import { AuthContext } from 'contexts/auth';
import { Link } from 'gatsby';
import React, { ReactElement, useContext } from 'react';
import { FlexDiv, NavLink } from 'styles';

// The navbar part that shown if you are logged in
export default function LoggedIn(): ReactElement {

  const { logOut } = useContext(AuthContext);

  return (
    <FlexDiv>
      <Link to="/app/profile">
        <NavLink>
          Profile
        </NavLink>
      </Link>
      <NavLink onClick={() => logOut({ logOutUser: true })}>
        Logout
      </NavLink>
    </FlexDiv>
  );

}

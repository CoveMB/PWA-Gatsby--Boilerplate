import React, { useState } from 'react';
import { Link } from 'gatsby';
import { NavLink } from 'styles/links';
import styled from 'styled-components';
import SignUpModal from './SignUpModal';

const Div = styled.div`
  display: flex;
`;

const LoggedOut = () => {

  const [ signUpModalOpen, setSignUpModalOpen ] = useState(false);
  const [ logInmodalOpen, setLogInModalOpen ] = useState(false);

  return (
    <Div>
      <NavLink onClick={() => setSignUpModalOpen(true)}>
        Signup
      </NavLink>
      <SignUpModal
        setSignUpModalOpen={setSignUpModalOpen}
        signUpModalOpen={signUpModalOpen}
      />
      <NavLink
        onClick={() => setLogInModalOpen(true)}
      >
        Login
      </NavLink>
    </Div>
  );

};

export default LoggedOut;

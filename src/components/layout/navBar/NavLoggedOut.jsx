import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'styles/links';
import SignUpModal from './authModal/AuthModal';

const Div = styled.div`
  display: flex;
`;

const LoggedOut = () => {

  const [ userAuthAction, setUserAuthAction ] = useState({ authModalOpen: false });
  const actions = {
    LOGIN         : 'login',
    SIGNUP        : 'signup',
    PASSWORD_RESET: 'passwordReset'
  };

  return (
    <Div>
      <NavLink onClick={() => setUserAuthAction({
        authAction: actions.SIGNUP, authModalOpen: true
      })}
      >
        Register
      </NavLink>
      <SignUpModal
        setAuthAction={setUserAuthAction}
        authModalOpen={
          userAuthAction.authModalOpen
        }
        authAction={
          userAuthAction.authAction
        }
        actions={actions}
      />
      <NavLink
        onClick={() => setUserAuthAction({
          authAction: actions.LOGIN, authModalOpen: true
        })}
      >
        Login
      </NavLink>
    </Div>
  );

};

export default LoggedOut;

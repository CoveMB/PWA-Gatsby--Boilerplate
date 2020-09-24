import React, { ReactElement, useState } from 'react';
import { FlexDiv, NavLink } from 'styles';
import AuthModal from './authModal/AuthModal';

// The navbar shown if you are logged out
export default function LoggedOut(): ReactElement {

  const actions = {
    LOGIN         : 'login',
    SIGNUP        : 'signup',
    PASSWORD_RESET: 'passwordReset'
  };

  const [ userAuthAction, setUserAuthAction ] = useState({
    authModalOpen: false, authAction: actions.LOGIN
  });

  return (
    <FlexDiv>

      <NavLink onClick={() => setUserAuthAction({
        authAction: actions.SIGNUP, authModalOpen: true
      })}
      >
        Register
      </NavLink>
      <AuthModal
        setAuthAction={setUserAuthAction}
        userAuthAction={userAuthAction}
        actions={actions}
      />
      <NavLink
        onClick={() => setUserAuthAction({
          authAction: actions.LOGIN, authModalOpen: true
        })}
      >
        Login
      </NavLink>
    </FlexDiv>
  );

}

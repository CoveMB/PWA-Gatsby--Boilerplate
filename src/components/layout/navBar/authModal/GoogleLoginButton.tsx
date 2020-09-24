import { GoogleClientId } from 'config/constants';
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthContext } from 'contexts/auth';
import { navigate } from 'gatsby';
import useHttp from 'hooks/http';
import PropTypes, { InferProps } from 'prop-types';
import React, { ReactElement, useContext, useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import styled from 'styled-components';
import { ErrorFeedBack } from 'styles';
import { Token, User } from 'types';

const ThirdPartyLogin = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-around
`;

export default function GoogleLoginButton(
  { redirect, redirectTo }: InferProps<typeof GoogleLoginButton.propTypes>
): ReactElement {

  const { sendRequest } = useHttp();
  const { logIn } = useContext(AuthContext);
  const [ loginError, setLoginError ] = useState('');

  // Handle login through google
  const responseGoogle = async (response: GoogleLoginResponse) => {

    // Extract information from user object
    const {
      email, name, imageUrl, googleId
    } = response.profileObj;

    // Send register request
    const { status, data } = await sendRequest<{token: Token, user: User}>({
      url   : '/register-third-party',
      method: 'POST',
      body  : {
        user: {
          email, name, profilePicture: imageUrl, googleId
        },
      }
    });

    // If the request is successful set the the new token and user
    if (status === 200) {

      logIn(data);

    }

    if (redirect) {

      navigate(redirectTo as string);

    }

  };

  return (
    <>
      <ThirdPartyLogin>
        <GoogleLogin
          clientId={GoogleClientId}
          buttonText="Login with Google"
          onSuccess={
            responseGoogle as (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void
          }
          onFailure={() => setLoginError('Oups something went wrong')}
          cookiePolicy="single_host_origin"
        />
      </ThirdPartyLogin>

      <ErrorFeedBack>{loginError && loginError}</ErrorFeedBack>
    </>

  );

}

GoogleLoginButton.propTypes = {
  redirect  : PropTypes.bool,
  redirectTo: PropTypes.string
};

GoogleLoginButton.defaultProps = {
  redirect  : false,
  redirectTo: '/app/profile'
};

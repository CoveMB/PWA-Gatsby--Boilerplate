/* eslint-disable @typescript-eslint/naming-convention */
import { AuthContext } from 'contexts/auth';
import { navigate } from 'gatsby';
import useHttp from 'hooks/http';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import styled from 'styled-components';
import { ErrorFeedBack } from 'styles';

const ThirdPartyLogin = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-around
`;

export default function GoogleLoginButton({ redirect, redirectTo }) {

  const { sendRequest } = useHttp();
  const { logIn } = useContext(AuthContext);
  const [ loginError, setLoginError ] = useState('');

  // Handle login through google
  const responseGoogle = async (response) => {

    // Extract information from user object
    const {
      email, name, imageUrl, googleId
    } = response.profileObj;

    // Send register request
    const { status, data } = await sendRequest({
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

      navigate(redirectTo);

    }

  };

  return (
    <>
      <ThirdPartyLogin>
        <GoogleLogin
          clientId={process.env.GATSBY_GOOGLE_LOGIN_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
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

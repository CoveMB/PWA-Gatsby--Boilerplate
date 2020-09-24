import Layout from 'components/layout/Layout';
import GoogleLoginButton from 'components/layout/navBar/authModal/GoogleLoginButton';
import SEO from 'components/layout/Seo';
import Loading from 'components/shared/Loading';
import { AuthContext } from 'contexts/auth';
import { navigate } from 'gatsby';
import useHttp from 'hooks/http';
import PropTypes, { InferProps, Validator } from 'prop-types';
import React, { ReactElement, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  card, ErrorFeedBack, Form, InputButton, Label, PageTitle
} from 'styles';
import { AuthToken, User } from 'types';

const Card = styled.div`
${card}
margin: auto;
width: 50%
`;

export const Header = styled.h2`
  text-align: center;
  margin: 60px 0 60px 0
`;

const Input = styled.input`
flex-grow: 2;
margin-bottom: 12px;
@media (max-width: 768px) {
  width: 80%;
  margin: 8px auto;
}
`;

export default function SetPassword(
  { location }: InferProps<typeof SetPassword.propTypes>
): ReactElement {

  const {
    register, handleSubmit, getValues, errors
  } = useForm<{ password: string, passwordRepeat: string }>();
  const { logIn } = useContext(AuthContext);
  const { isLoading, sendRequest, httpError } = useHttp();

  const storeTokenAndNavigate = (resetRequest: {user: User, token: AuthToken}): void => {

    // Set the new token
    logIn(resetRequest);

    // Navigate to profile page
    navigate('/app/profile');

  };

  const setPassword = async ({ password }: { password: string }): Promise<void> => {

    // The token should be located in the params of the url
    if (location.search.includes('?token=')) {

      // Get the token
      const token = location.search.replace('?token=', '');

      // Send a request to change the password with the new password
      const { data, status } = await sendRequest<{user: User, token: AuthToken}>({
        url   : '/set-password',
        method: 'PUT',
        body  : {
          password, token
        },
      });

      if (status === 204) {

        // If the request is successful the the new token
        storeTokenAndNavigate(data);

      }

    }

  };

  return (
    <Layout>
      <SEO title="Password Reset" />

      <PageTitle>Choose your password</PageTitle>
      <Card>

        <Form onSubmit={handleSubmit(setPassword)}>
          <Label htmlFor="password">Your new password:</Label>
          <Input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({
              required : 'A new password is required',
              maxLength: {
                value  : 80,
                message: 'A password should be no more than 80 character long'
              },
              minLength: {
                value  : 8,
                message: 'A password should be at least 8 character long'
              }
            })}
          />
          <ErrorFeedBack>{errors.password && errors.password.message}</ErrorFeedBack>

          <Label htmlFor="passwordRepeat">Repeat Password:</Label>
          <Input
            name="passwordRepeat"
            type="password"
            ref={register({
              required: 'Please confirm your password',
              validate: (value) => {

                const { password } = getValues();

                return value === password || 'Passwords should match!';

              },
            })}
          />
          <ErrorFeedBack>{errors.passwordRepeat && errors.passwordRepeat.message}</ErrorFeedBack>

          <ErrorFeedBack>{httpError && httpError}</ErrorFeedBack>
          {isLoading
            ? <Loading />
            : (
              <InputButton value="Reset Password" />
            )}
        </Form>
      </Card>

      <Header>Or Login with Google</Header>
      <GoogleLoginButton
        redirect
        redirectTo="/app/profile"
      />

    </Layout>
  );

}

SetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }) as Validator<Location>
};

SetPassword.defaultProps = {
  location: {},
};

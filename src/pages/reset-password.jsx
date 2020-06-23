import Layout from 'components/layout/Layout';
import SEO from 'components/layout/Seo';
import Loading from 'components/shared/Loading';
import { AuthContext } from 'contexts/auth';
import { navigate } from 'gatsby';
import useHttp from 'hooks/http';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorFeedBack, InputButton, Label } from 'styles/form';
import { PageTitle } from 'styles/texts';

const Form = styled.form`
margin: 0 10%;
display: flex;
justify-content: space-around;
align-items: baseline;
@media (max-width: 768px) {
  flex-direction: column;
  width: 80%;
  margin: auto;
  align-items: center;
}
`;

const Input = styled.input`
flex-grow: 2;
margin: 8px 5%;
@media (max-width: 768px) {
  width: 80%;
  margin: 8px auto;
}
`;

const RestPassword = ({ location }) => {

  const [ errorFeedback, setErrorFeedback ] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const { setToken } = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttp({ url: 'test' });

  const storeTokenIfSuccess = (resetRequest) => {

    if (resetRequest && resetRequest.token) {

      // Set the new token
      setToken(resetRequest);

      // Navigate to profile page
      navigate('/app/profile');

    }

  };

  const resetPassword = async (password) => {

    // The token should be located in the params of the url
    if (location.search.includes('?token=')) {

      // Get the token
      const token = location.search.replace('?token=', '');

      // Send a request to change the password with the new password
      const resetRequest = await sendRequest({
        url    : '/reset-password',
        method : 'POST',
        body   : password,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // If the request is successful the the new token
      storeTokenIfSuccess(resetRequest);

    }

    // Is something went wrong the token might have expired
    setErrorFeedback('Your token might have expired, please request a new one');

  };

  return (
    <Layout>
      <SEO title="Password Reset" />

      <PageTitle>Reset your password</PageTitle>

      <Form onSubmit={handleSubmit(resetPassword)}>
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

        {isLoading
          ? <Loading />
          : (
            <InputButton value="Reset Password" />
          )}
      </Form>

      <ErrorFeedBack>{errors.password && errors.password.message}</ErrorFeedBack>
      <ErrorFeedBack>{errorFeedback && errorFeedback}</ErrorFeedBack>

    </Layout>
  );

};

RestPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
};

export default RestPassword;

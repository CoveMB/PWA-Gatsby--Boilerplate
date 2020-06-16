import React, { useContext } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useHttp from 'hooks/http';
import { emailRegEx } from 'config/constants';
import Loading from 'components/shared/Loading';
import styled from 'styled-components';
import { ErrorFeedBack, Label, FormTitle, InputButton } from 'styles/form';
import { AuthContext } from 'contexts/auth';

Modal.setAppElement('#___gatsby');
const customStyles = {
  content: {
    top        : '50%',
    left       : '50%',
    right      : 'auto',
    bottom     : 'auto',
    marginRight: '-50%',
    boxShadow  : '0px 3px 6px #222',
    transform  : 'translate(-50%, -50%)',
    width      : '30%'
  }
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignUpModal = ({ signUpModalOpen, setSignUpModalOpen }) => {

  const {
    register, handleSubmit, errors, getValues
  } = useForm();
  const {
    isLoading, httpError, sendRequest
  } = useHttp();
  const { setToken } = useContext(AuthContext);

  const registerNewUser = async (userInfo) => {

    const { email, password } = userInfo;

    const userData = {
      email, password
    };

    const signedUser = await sendRequest({
      url: '/users', method: 'POST', body: userData
    });

    if (signedUser && signedUser.token) {

      setToken(signedUser);

    }

  };

  return (
    <Modal
      isOpen={signUpModalOpen}
      onRequestClose={() => setSignUpModalOpen(false)}
      style={customStyles}
      contentLabel="SignUp Modal"
    >

      <FormTitle>Sign Up</FormTitle>
      <form onSubmit={handleSubmit(registerNewUser)}>
        <Div>

          <Label htmlFor="email">Email:</Label>
          <input
            name="email"
            placeholder="Email"
            ref={register({
              required: 'An email is required',
              pattern : {
                value  : emailRegEx,
                message: 'Please register a valid email address',
              },
            })}
          />
          <ErrorFeedBack>{errors.email && errors.email.message}</ErrorFeedBack>

          <Label htmlFor="password">Password:</Label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({
              required : 'A password is required',
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
          <input
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
              <InputButton />
            )}
        </Div>
      </form>
    </Modal>
  );

};

SignUpModal.propTypes = {
  signUpModalOpen   : PropTypes.bool.isRequired,
  setSignUpModalOpen: PropTypes.func.isRequired
};

export default SignUpModal;

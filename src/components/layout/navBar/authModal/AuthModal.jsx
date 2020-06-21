import Loading from 'components/shared/Loading';
import { emailRegEx } from 'config/constants';
import { AuthContext } from 'contexts/auth';
import useHttp from 'hooks/http';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import styled from 'styled-components';
import { secondColor } from 'styles/colors';
import { ErrorFeedBack, FormTitle, InputButton, Label, SuccessFeedBack } from 'styles/form';

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
    width      : '30%',
    padding    : '0',
  }
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PasswordResetRequest = styled.p`
  color: ${secondColor};
  cursor: pointer
`;

const SignUpModal = ({
  authModalOpen, setAuthAction, authAction, actions
}) => {

  const {
    register, handleSubmit, errors, getValues
  } = useForm();
  const {
    isLoading, httpError, sendRequest, clearHttpState
  } = useHttp();
  const [ successFeedBack, setSuccessFeedBack ] = useState('');
  const { setToken } = useContext(AuthContext);
  const { SIGNUP, LOGIN, PASSWORD_RESET } = actions;

  const storeTokenIfSuccess = (loggedInUser) => {

    if (loggedInUser && loggedInUser.token) {

      setToken(loggedInUser);

    }

  };

  const loginUser = async (userInfo) => {

    const loggedInUser = await sendRequest({
      url: '/login', method: 'POST', body: userInfo
    });

    storeTokenIfSuccess(loggedInUser);

  };

  const registerNewUser = async (userInfo) => {

    const { email, password } = userInfo;

    const userData = {
      email, password
    };

    const signedUser = await sendRequest({
      url: '/users', method: 'POST', body: userData
    });

    storeTokenIfSuccess(signedUser);

  };

  const passwordResetRequest = async (userInfo) => {

    const passwordResetResponse = await sendRequest({
      url: '/request-password-reset', method: 'POST', body: userInfo
    });

    if (passwordResetResponse.status === 'success') {

      setSuccessFeedBack('An email has been sent to the indicated email');

    }

  };

  const closeAuthModal = () => {

    setAuthAction({ authModalOpen: false });
    clearHttpState();

  };

  const switchAuthAction = (newAction) => {

    setAuthAction({
      authModalOpen: true, authAction: newAction
    });
    clearHttpState();

  };

  const submitAuthAction = (formData) => {

    switch (authAction) {

      case LOGIN:
        loginUser(formData);
        break;
      case SIGNUP:
        registerNewUser(formData);
        break;
      case PASSWORD_RESET:
        passwordResetRequest(formData);
        break;

      default:
        break;

    }

  };

  const getSubmitBtnText = () => {

    switch (authAction) {

      case LOGIN:
        return 'Log In';
      case SIGNUP:
        return 'Sig Up';
      case PASSWORD_RESET:
        return 'Send reset link';
      default:
        return 'Submit';

    }

  };

  return (
    <Modal
      isOpen={authModalOpen}
      onRequestClose={closeAuthModal}
      style={customStyles}
      contentLabel="SignUp Modal"
    >
      <TitleDiv>
        <FormTitle
          active={authAction === SIGNUP}
          onClick={() => switchAuthAction(SIGNUP)}
        >
          Register
        </FormTitle>
        <FormTitle
          active={authAction === LOGIN}
          onClick={() => switchAuthAction(LOGIN)}
        >
          Log In
        </FormTitle>
      </TitleDiv>
      <form onSubmit={handleSubmit(submitAuthAction)}>
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

          {(authAction === SIGNUP || authAction === LOGIN)
          && (
            <>
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
            </>
          )}

          {authAction === SIGNUP && (
            <>
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
            </>
          ) }

          {authAction === LOGIN && (
            <>
              <PasswordResetRequest onClick={() => switchAuthAction(PASSWORD_RESET)}>Forgot your password ? </PasswordResetRequest>
            </>
          ) }

          <ErrorFeedBack>{httpError && httpError}</ErrorFeedBack>
          <SuccessFeedBack>{successFeedBack && successFeedBack}</SuccessFeedBack>

          {isLoading
            ? <Loading />
            : (
              <InputButton value={getSubmitBtnText()} />
            )}
        </Div>
      </form>
    </Modal>
  );

};

SignUpModal.propTypes = {
  authModalOpen: PropTypes.bool.isRequired,
  setAuthAction: PropTypes.func.isRequired,
  actions      : PropTypes.shape({
    LOGIN: PropTypes.string, SIGNUP: PropTypes.string, PASSWORD_RESET: PropTypes.string
  }).isRequired,
  authAction: PropTypes.string
};

SignUpModal.defaultProps = {
  authAction: '',
};

export default SignUpModal;

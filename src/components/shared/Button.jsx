import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { button } from 'styles/button';

const StyledButton = styled.div`
  ${button}
`;

const Button = ({ text, type }) => (
  <>
    <StyledButton type={type}>{text}</StyledButton>
  </>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string
};

Button.defaultProps = {
  type: 'submit'
};

export default Button;

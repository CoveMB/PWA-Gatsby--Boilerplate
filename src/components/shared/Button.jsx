import React from 'react';
import { button } from 'styles/button';
import styled from 'styled-components';

const StyledButton = styled.div`
  ${button}
`;

const Button = ({ text, type }) => (
  <>
    <StyledButton type={type}>{text}</StyledButton>
  </>
);

export default Button;

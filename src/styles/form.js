import styled from 'styled-components';
import { errorColor, mainColor } from './colors';
import { button } from './button';

export const ErrorFeedBack = styled.div`
  color: ${errorColor};
  margin-top: 6px;
  text-align: center
`;

export const Label = styled.label`
margin: 16px 0 8px 0;
`;

export const FormTitle = styled.h2`
text-align: center;
color: ${mainColor}
`;

export const InputButton = styled.input.attrs({
  type : 'submit',
  value: 'Register'
})`
  ${button}
  margin-top: 20px;
`;

import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { button } from 'styles';

const StyledButton = styled.div`
  ${button}
`;

export default function Button({ text, type }: InferProps<typeof Button.propTypes>) {

  return (
    <>
      <StyledButton type={type}>{text}</StyledButton>
    </>
  );

}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string
};

Button.defaultProps = {
  type: 'submit'
};

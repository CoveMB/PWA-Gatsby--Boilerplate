import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { card } from 'styles';

const CardDiv = styled.div`
  ${card}
  ${({ style }) => style}
`;

const CardTitle = styled.p`
  font-size: 2em;
  text-align: center;
  font-weight: bold
`;

export default function Card({
  children, title, style, onClick
}) {

  return (
    <CardDiv style={style} onClick={onClick}>
      <CardTitle>{title}</CardTitle>
      {children}
    </CardDiv>
  );

}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title   : PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  onClick : PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style   : PropTypes.object
};

Card.defaultProps = {
  title: '',
  style: {}
};

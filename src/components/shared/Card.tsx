import PropTypes, { InferProps } from 'prop-types';
import React, { CSSProperties, ReactElement, Requireable } from 'react';
import styled from 'styled-components';
import { card } from 'styles';

const CardDiv = styled.div`
  ${card}
  ${({ style }: {style: CSSProperties}) => style}
`;

const CardTitle = styled.p`
  font-size: 2em;
  text-align: center;
  font-weight: bold
`;

export default function Card({
  children, title, style, onClick
}: InferProps<typeof Card.propTypes>): ReactElement {

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
  style   : PropTypes.object as Requireable<CSSProperties>
};

Card.defaultProps = {
  title: '',
  style: {}
};

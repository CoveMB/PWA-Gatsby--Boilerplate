import PropTypes, { InferProps } from 'prop-types';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { headerFont, mainColor } from 'styles';

const Header = styled.p`
  margin-top: 15px;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: ${mainColor};
  font-family: ${headerFont}
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto
`;

export default function PageHeader({ text = '' }: InferProps<typeof PageHeader.propTypes>): ReactElement {

  return (
    <Div>
      <Header>{text}</Header>
    </Div>
  );

}

PageHeader.propTypes = {
  text: PropTypes.string,
};

PageHeader.defaultProps = {
  text: ''
};

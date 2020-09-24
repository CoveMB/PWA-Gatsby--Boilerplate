import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { headerFont } from 'styles/fonts';
import { mainColor } from 'styles/colors';

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

const PageHeader = ({ text }) => (
  <Div>
    <Header>{text}</Header>
  </Div>
);

PageHeader.propTypes = {
  text: PropTypes.string,
};

PageHeader.defaultProps = {
  text: '',
};

export default PageHeader;

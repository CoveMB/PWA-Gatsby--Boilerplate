import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
import { scrollbar } from 'styles/scrollbar';
import { bodyFont } from 'styles/fonts';
import { mainColor } from 'styles/colors';
import NavBar from './NavBar';
import PageHeader from './PageHeader';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
  }

  body {
    ${scrollbar}
    margin:0;
    padding:0;
    width: 100%;
    padding-bottom: 20px;
    overflow-x: hidden;
    background-color: white;
  }

  a {
    text-decoration: none;
  }

  input {
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid ${mainColor};
    outline: none
  }
`;

const Container = styled.div`
  margin: 0 8vw;
  font-family: ${bodyFont};
`;

const Layout = ({ children, header }) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />
      <NavBar siteTitle={data.site.siteMetadata.title} />
      <Container>
        <PageHeader text={header} />
        {children}
      </Container>
    </>
  );

};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header  : PropTypes.string
};

Layout.defaultProps = {
  header: '',
};

export default Layout;

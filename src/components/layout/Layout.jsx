/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
import { scrollbar } from 'styles/scrollbar';
import { bodyFont } from 'styles/fonts';
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
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
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

import React, { useContext } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { mainColor } from 'styles/colors';
import { bodyFont } from 'styles/fonts';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { AuthContext } from 'contexts/auth';
import LoggedIn from 'components/auth/NavLoggedIn';
import LoggedOut from 'components/auth/NavLoggedOut';

const Header = styled.header`
  height: 50px;
  padding: 15px 20px 15px 20px;
  background-color: ${mainColor};
  font-family: ${bodyFont};
`;

const Div = styled.div`
  margin: 0 auto;
  max-width: 960;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1.45rem 1.0875rem,
`;

const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const spin = keyframes`
  100% { transform: rotate(360deg);
}`;

const Icon = styled.div`
  width:26px;
  margin: 0 10px 5px 0;
  animation: ${spin} 26s linear infinite;
`;

const NavBar = ({ siteTitle }) => {

  const authContext = useContext(AuthContext);

  const data = useStaticQuery(graphql`
  query {
    placeholderImage: file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 40) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`);

  return (
    <Header>
      <Div>
        <Link to="/">
          <Div>
            <Icon>
              <Img fluid={data.placeholderImage.childImageSharp.fluid} alt="Icon image" />
            </Icon>
            <Title>
              {siteTitle}
            </Title>
          </Div>

        </Link>
        {
          authContext.isAuthenticated
            ? <LoggedIn />
            : <LoggedOut />
        }

      </Div>
    </Header>
  );

};

NavBar.propTypes = {
  siteTitle: PropTypes.string,
};

NavBar.defaultProps = {
  siteTitle: '',
};

export default NavBar;

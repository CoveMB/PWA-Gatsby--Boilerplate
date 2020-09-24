import LoggedIn from 'components/layout/navBar/NavLoggedIn';
import LoggedOut from 'components/layout/navBar/NavLoggedOut';
import { AuthContext } from 'contexts/auth';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes, { InferProps } from 'prop-types';
import React, { ReactElement, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { bodyFont, mainColor } from 'styles';
import { ImageQuerySharp } from 'types';

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

export default function NavBar({ siteTitle = '' }: InferProps<typeof NavBar.propTypes>): ReactElement {

  const { isAuthenticated } = useContext(AuthContext);

  const data = useStaticQuery<ImageQuerySharp>(graphql`
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
          isAuthenticated
            ? <LoggedIn />
            : <LoggedOut />
        }

      </Div>
    </Header>
  );

}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
};

NavBar.defaultProps = {
  siteTitle: '',
};

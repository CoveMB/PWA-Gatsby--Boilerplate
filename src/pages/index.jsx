import Layout from 'components/layout/Layout';
import SEO from 'components/layout/Seo';
import Astronaute from 'components/shared/Astronaute';
import { Link } from 'gatsby';
import React from 'react';

// The home page
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi there!</h1>
    <p>Welcome to your PWA boilerplate.</p>
    <div style={{
      maxWidth: '300px', marginBottom: '1.45rem'
    }}
    >
      <Astronaute />
    </div>
    <Link to="/app/profile/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;

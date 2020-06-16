import React from 'react';
import { Link } from 'gatsby';
import Layout from 'components/layout/Layout';
import Astronaute from 'components/shared/Astronaute';
import SEO from 'components/layout/seo';

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

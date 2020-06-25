import Layout from 'components/layout/Layout';
import SEO from 'components/layout/Seo';
import Astronaute from 'components/shared/Astronaute';
import { Link } from 'gatsby';
import useHttp from 'hooks/http';
import React from 'react';

const query = `
query {
    users(orderBy: id) {
    
      tokens(orderBy: id) {
        device
      }
    }
}
`;

// The home page
const IndexPage = () => {

  const { httpData } = useHttp({
    url: '/graphql', method: 'POST', body: { query }
  });

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi there!</h1>
      {JSON.stringify(httpData)}
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

};

export default IndexPage;

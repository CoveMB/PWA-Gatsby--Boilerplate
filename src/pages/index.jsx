import React from 'react';
import { Link } from 'gatsby';
import Layout from 'components/layout/Layout';
import { useAuth } from 'react-use-auth';
import Astronaute from 'shared/Astronaute';
import SEO from 'components/layout/seo';

const IndexPage = () => {

  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Layout>
      <SEO title="Home" />
      {isAuthenticated() ? (<button onClick={logout}>Logout</button>) : (<button onClick={login}>Login</button>)}

      <h1>Hi there!</h1>
      <p>Welcome to your PWA boilerplate.</p>
      <div style={{
        maxWidth: '300px', marginBottom: '1.45rem'
      }}
      >
        <Astronaute />
      </div>
      <Link to="/profile/">Go to page 2</Link>
      {' '}
      <br />
      <Link to="/Chat/">Go to "Using TypeScript"</Link>
    </Layout>
  );

};

export default IndexPage;

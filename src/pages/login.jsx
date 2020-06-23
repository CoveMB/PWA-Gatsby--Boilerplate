import Layout from 'components/layout/Layout';
import SEO from 'components/layout/Seo';
import React from 'react';
import { PageTitle } from 'styles/texts';

// The login page is the one that unauthenticated user are redirected to
const Login = () => (
  <Layout>
    <SEO title="Authentication" />
    <PageTitle>You need to be authenticated to access this content!</PageTitle>
  </Layout>
);

export default Login;

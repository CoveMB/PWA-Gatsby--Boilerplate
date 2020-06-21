import React from 'react';
import SEO from 'components/layout/seo';
import Layout from 'components/layout/Layout';
import { PageTitle } from 'styles/texts';

const Auth = () => (
  <Layout>
    <SEO title="Authentication" />
    <PageTitle>You need to be authenticated to access this content!</PageTitle>
  </Layout>
);

export default Auth;

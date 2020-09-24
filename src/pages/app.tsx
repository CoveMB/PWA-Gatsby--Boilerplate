import { Router } from '@reach/router';
import Layout from 'components/layout/Layout';
import PrivateRoute from 'components/privateRoute/PrivateRoute';
import Profile from 'components/profile/Profile';
import React, { ReactElement } from 'react';

// Define the routes of the app, those routes will be the ones protected under authentication
export default function App(): ReactElement {

  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute path="/profile" component={Profile} />
      </Router>
    </Layout>
  );

}

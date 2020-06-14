import React from 'react';
import { Router } from '@reach/router';
import Layout from 'components/layout/Layout';
import Profile from 'components/profile/Profile';
import PrivateRoute from 'components/auth/PrivateRoute';

const App = () => (
  <Layout>
    <Router basepath="/app">
      <PrivateRoute path="/profile" component={Profile} />
    </Router>
  </Layout>
);

export default App;

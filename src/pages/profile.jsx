import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { AuthContext } from 'contexts/auth';
import Layout from 'components/layout/Layout';
import SEO from 'components/layout/seo';
import Auth from './auth';

const SecondPage = () => {

  const authContext = useContext(AuthContext);

  let content = <Auth />;

  if (authContext.isAuth) {

    content = <h1>PROFILE PAGE</h1>;

  }

  return content;

};

export default SecondPage;

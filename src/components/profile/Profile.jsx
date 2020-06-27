import SEO from 'components/layout/Seo';
import useHttp from 'hooks/http';
import React from 'react';
import { useStore } from 'store/useStore';
import { PageTitle } from 'styles/texts';
import TokenList from './TokensList/TokenList';

// Query all users and all tokens
const query = `
  query {
      tokens(orderBy: id) {
        id
        device
        token
      }
    }`;

const Profile = () => {

  const { user } = useStore()[0];
  const { httpData } = useHttp({
    url: '/graphql', method: 'POST', body: { query }
  });

  return (
    <>
      <SEO title="Profile" />
      <PageTitle>
        Welcome
        {' '}
        {user.email}
      </PageTitle>
      <TokenList tokens={httpData.data && httpData.data.tokens} />
    </>

  );

};

export default Profile;

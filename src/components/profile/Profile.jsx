import SEO from 'components/layout/Seo';
import useHttp from 'hooks/http';
import React, { useEffect } from 'react';
import { useStore } from 'store/useStore';
import { PageTitle } from 'styles/texts';
import TokenList from './TokensList/TokenList';

const Profile = () => {

  const { user } = useStore()[0];
  const { httpData, sendRequest } = useHttp();

  useEffect(() => {

    (async () => {

      if (user.email) {

        // Query the user
        const query = `
          query {
            user(email: "${user.email}"){
              tokens(orderBy: id) {
                id
                device
                token
              }
            }
          }`;

        sendRequest({
          url: '/graphql', method: 'POST', body: { query }
        });

      }

    })();

  }, [ sendRequest, user.email ]);

  return (
    <>
      <SEO title="Profile" />
      <PageTitle>
        Welcome
        {' '}
        {user.email}
      </PageTitle>
      <TokenList tokens={httpData.data && httpData.data.user.tokens} />
    </>

  );

};

export default Profile;

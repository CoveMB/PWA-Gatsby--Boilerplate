import SEO from 'components/layout/Seo';
import useHttp from 'hooks/http';
import React, { useEffect } from 'react';
import { useStore } from 'store/useStore';
import { PageTitle } from 'styles/texts';
import TokenList from './TokensList/TokenList';

const Profile = () => {

  const [ { user, userData }, dispatch ] = useStore();
  const { httpData, sendRequest } = useHttp();

  useEffect(() => {

    (async () => {

      if (user.email) {

        // Query the user
        const query = /* GraphQL */`
          query {
            user(uuid: "${user.uuid}"){
              tokens(orderBy: id) {
                device
                token
              }
            }
          }`;

        const { data } = await sendRequest({
          url: '/graphql', method: 'POST', body: { query }
        });

        dispatch('UPDATE_USER_DATA', { tokens: data.data.user.tokens });

      }

    })();

  }, [
    sendRequest,
    user.email,
    user.uuid,
    dispatch
  ]);

  return (
    <>
      <SEO title="Profile" />
      <PageTitle>
        Welcome
        {' '}
        {user.email}
      </PageTitle>
      <TokenList />
    </>

  );

};

export default Profile;

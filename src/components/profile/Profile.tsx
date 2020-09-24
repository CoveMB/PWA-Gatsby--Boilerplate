import SEO from 'components/layout/Seo';
import useHttp from 'hooks/http';
import React, { ReactElement, useEffect } from 'react';
import { useStore } from 'store/useStore';
import { PageTitle } from 'styles';
import { UserData } from 'types';
import TokenList from './TokensList/TokenList';

export default function Profile(): ReactElement {

  const [ { userData, user }, dispatch ] = useStore();
  const { sendRequest } = useHttp();

  useEffect(() => {

    (async () => {

      if (user) {

        // Query the user
        const query = /* GraphQL */`
        query {
          user(uuid: "${user.uuid}"){
            email
            tokens(orderBy: id) {
              device
              token
            }
          }
        }`;

        const { data: { data: { user: { tokens, email } } } } = await sendRequest<
        {data: {user: UserData}}
        >({
          url: '/graphql', method: 'POST', body: { query }
        });

        dispatch('UPDATE_USER_DATA', {
          tokens, email
        });

      }

    })();

  }, [ user ]);

  return (
    <>
      <SEO title="Profile" />
      <PageTitle>
        Welcome
        {' '}
        {userData?.email}
      </PageTitle>
      <TokenList />
    </>

  );

}

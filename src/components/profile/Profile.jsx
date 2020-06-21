import SEO from 'components/layout/seo';
import React from 'react';
import { useStore } from 'store/useStore';
import { PageTitle } from 'styles/texts';

const Profile = () => {

  const { user } = useStore()[0];

  return (
    <>
      <SEO title="Profile" />
      <PageTitle>
        Welcome
        {' '}
        {user.email}
      </PageTitle>
    </>

  );

};

export default Profile;

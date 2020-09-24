/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import PropTypes, { InferProps, Validator } from 'prop-types';
import React, { ReactElement } from 'react';
import { Helmet, HelmetProps } from 'react-helmet';
import { SiteData } from 'types';

export default function SEO({
  description = '', lang = 'en', meta, title
}: InferProps<typeof SEO.propTypes> & HelmetProps): ReactElement {

  const { site } = useStaticQuery<SiteData>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name   : 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content : title,
        },
        {
          property: 'og:description',
          content : metaDescription,
        },
        {
          property: 'og:type',
          content : 'website',
        },
        {
          name   : 'twitter:card',
          content: 'summary',
        },
        {
          name   : 'twitter:title',
          content: title,
        },
        {
          name   : 'twitter:description',
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );

}

SEO.propTypes = {
  description: PropTypes.string,
  lang       : PropTypes.string as Validator<string>,
  meta       : PropTypes.arrayOf(PropTypes.object) as Validator<{
    property: string; content: string | undefined; name?: undefined
  }>
};

SEO.defaultProps = {
  description: '',
  lang       : 'en',
  meta       : []
};

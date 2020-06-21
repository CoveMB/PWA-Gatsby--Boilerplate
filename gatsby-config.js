module.exports = {
  siteMetadata: {
    title      : 'PWA starter',
    description: 'A PWA starter with login',
    author     : 'Benjamin Marquis',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts  : [ 'Lato', 'Roboto' ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name              : 'gatsby-pwa-boilerplate',
        short_name        : 'starter',
        start_url         : '/',
        background_color  : '#663399',
        theme_color       : '#663399',
        display           : 'minimal-ui',
        icon              : 'src/images/gatsby-icon.png',
        cache_busting_mode: 'none' // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: [ '//' ],
        workboxConfig: {
          globPatterns: [ '**/*' ]
        }
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: [ '/app/*' ] },
    },
  ],
};

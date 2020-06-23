module.exports = {
  siteMetadata: {
    title      : 'PWA starter',
    description: 'A PWA starter with login',
    author     : 'Benjamin Marquis',
  },
  plugins: [
    'gatsby-plugin-netlify',

    // Allow use styled components
    'gatsby-plugin-styled-components',

    // Allow dynamic injection in the head (for SEO)
    'gatsby-plugin-react-helmet',
    {

      // Import google fonts in head
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

    // Allow dynamic image size import
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {

      // The included manifest
      resolve: 'gatsby-plugin-manifest',
      options: {
        name              : 'gatsby-pwa-boilerplate',
        short_name        : 'starter',
        start_url         : '/',
        background_color  : '#4a0f37',
        theme_color       : '#4a0f37',
        display           : 'minimal-ui',
        icon              : 'src/images/gatsby-icon.png',
        cache_busting_mode: 'none' // This path is relative to the root of the site.
      },
    },
    {

      // Here you can configure workbox cache strategies
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

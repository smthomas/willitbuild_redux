require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `My News Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    // `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `@chakra-ui/gatsby-plugin`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.DRUPAL_URL,
        skipFileDownloads: true,
        fastBuilds: true,
        filters: {
          // collection : filter
          "file--file": "filter[status][value]=1",
        },
      },
    },
  ],
};

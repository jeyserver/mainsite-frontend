module.exports = {
  async rewrites() {
    const rewrites = [];
    if (process.env.BACKEND_UPSTREAM) {
      rewrites.push({
        source: '/:path*',
        destination: `${process.env.BACKEND_UPSTREAM}/:path*`,
      });
    }
    return rewrites;
  },
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
    localeDetection: false,
  },
  env: {
    DOMAIN: 'www.jeyserver.com',
    SCHEMA: 'https',
    SITE_URL: 'https://www.jeyserver.com',
    BACKEND_UPSTREAM: 'https://www.jeyserver.com',
  },
};

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
    DOMAIN: 'www.jeyserver.jey',
    SCHEMA: 'https',
    SITE_URL: 'http://www.jeyserver.jey',
    BACKEND_UPSTREAM: 'http://www.jeyserver.jey',
    EXPIRE_CART_TIME: 3600,
  },
};

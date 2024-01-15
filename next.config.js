/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    imageSizes: [200],
    remotePatterns: [],
    minimumCacheTTL: 31536000,
  },
  trailingSlash: true,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));

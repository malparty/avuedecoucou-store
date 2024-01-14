/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    imageSizes: [200],
    remotePatterns: [],
    minimumCacheTTL: 31536000,
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

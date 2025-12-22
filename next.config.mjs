import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  redirects: async () => [
    {
      source: '/',
      destination: '/home',
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.boardbuddi.com',
        port: '',
      },
    ],
  },
});

export default nextConfig;

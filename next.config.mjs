/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: false,
  async redirects() {
    return [
      {
        source: '/portfolios',
        destination: '/work',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;

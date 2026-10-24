/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: false,
  async redirects() {
    return [
      {
        source: '/portfolios',
        destination: '/portfolio',
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

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // allowedDevOrigins: ['192.168.0.24', '192.168.3.4'],

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-fbfe1c0ef2a84b7986f4a75b80cd8c32.r2.dev',
      },
    ],
  },
};

module.exports = { allowedDevOrigins: ['192.168.3.4'] };

export default nextConfig;

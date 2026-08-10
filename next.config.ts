import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.3.4'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-fbfe1c0ef2a84b7986f4a75b80cd8c32.r2.dev',
      },
    ],
  },
};

export default nextConfig;

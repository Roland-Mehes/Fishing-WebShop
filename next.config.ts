import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://avatar.vercel.sh/shadcn1')],
  },
};

module.exports = { allowedDevOrigins: ['192.168.0.24'] };

export default nextConfig;

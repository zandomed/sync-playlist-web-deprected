import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  // typedRoutes: true,
};

export default nextConfig;

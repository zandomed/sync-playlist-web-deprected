import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  // typedRoutes: true,
};

export default nextConfig;

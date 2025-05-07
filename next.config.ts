
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Add this line for static exports
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // When using output: 'export', you might need to configure images differently
    // or set unoptimized: true if using next/image with dynamic sources extensively
    // For picsum.photos, it should work if they are resolved at build time.
    // If issues arise, consider `unoptimized: true` for next/image components.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

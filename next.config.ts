
import type {NextConfig} from 'next';

// Determine if the build is running in GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

// IMPORTANT: Replace 'firebase-studio' with your actual GitHub repository name
const repoName = 'avsie'; 

const basePath = isGithubActions ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: isGithubActions ? `/${repoName}/` : undefined, // assetPrefix needs a trailing slash
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  }
};

export default nextConfig;

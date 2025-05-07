
import type {NextConfig} from 'next';

// Determine if the build is running in GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

// IMPORTANT: Replace 'firebase-studio' with your actual GitHub repository name
// This is used to set the basePath for GitHub Pages deployment.
// For example, if your GitHub Pages URL is https://your-username.github.io/my-cool-site,
// then repoName should be 'my-cool-site'.
// If you are deploying to a custom domain or to the root of your-username.github.io,
// set repoName to an empty string '' or remove/comment out basePath and assetPrefix.
const repoName = 'firebase-studio'; 

const nextConfig: NextConfig = {
  output: 'export',
  // Set basePath and assetPrefix only for GitHub Pages deployment
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : undefined, // assetPrefix needs a trailing slash
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Image Optimization is not compatible with `output: 'export'` by default.
    // `unoptimized: true` disables the Image Optimization API and allows images to work with static exports.
    unoptimized: true,
    // remotePatterns are not needed for local images in the /public directory
    // but are kept here in case picsum.photos placeholders are used elsewhere or in the future.
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

import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      // Add additional image hosts if needed
      {
        protocol: 'https',
        hostname: '**.example.com', // Wildcard for subdomains
      }
    ],
    minimumCacheTTL: 60, // Cache optimization
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Optional: similar to ESLint ignore
  },
  output: 'standalone',
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      pure: true,
    },
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      // Add other heavy UI libraries here
    ],
    serverActions: true,
    optimizeServerReact: true,
    missingSuspenseWithCSRBailout: false,
    // Windows path workaround for (dashboard) issue:
    enableUndici: true, // Modern HTTP client
  },
  // Windows-specific workaround for missing client-reference-manifest
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new class {
          apply(compiler) {
            compiler.hooks.done.tap('WindowsPathPlugin', () => {
              const fs = require('fs');
              const path = require('path');
              const src = path.join('.next', 'server', 'app');
              const dest = path.join('.next', 'standalone', '.next', 'server', 'app');

              if (fs.existsSync(src)) {
                fs.cpSync(src, dest, { recursive: true, force: true });
              }
            });
          }
        }
      );
    }
    return config;
  },
  // Production logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
} satisfies NextConfig;

export default nextConfig;
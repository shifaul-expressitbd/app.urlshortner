import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000', 'http://localhost:4000'],
  async rewrites() {
    return [
        {
            source: '/s/:path*',
            destination: (process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:4000') + '/s/:path*',
        },
        {
            source: '/api/s/:path*',
            destination: (process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:4000') + '/s/:path*',
        },
        {
            source: '/api/:path*',
            destination: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api') + '/:path*',
        },
    ]
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (no Node.js server)
  output: 'export',
  
  // Trailing slashes for static hosting
  trailingSlash: true,
  
  // Optimize images - unoptimized for static export (use pre-optimized webp)
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize bundle
  experimental: {
    optimizeCss: true,
  },
  
  // Note: Headers are handled by Cloudflare Pages via public/_headers file
  // since async headers() doesn't work with output: 'export'
};

export default nextConfig;

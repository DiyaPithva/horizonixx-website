/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable compression
  compress: true,
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'w7.pngwing.com' },
      { protocol: 'https', hostname: 'lh4.googleusercontent.com' },
      { protocol: 'https', hostname: 'e7.pngegg.com' },
      { protocol: 'https', hostname: 'npop.apeda.gov.in' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
  // Performance optimizations
  swcMinify: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Optimize fonts
  optimizeFonts: true,
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  images: {
    path: `$./_next/image`,
  }
}

module.exports = nextConfig

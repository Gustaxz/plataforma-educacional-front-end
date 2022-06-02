/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
}

module.exports = nextConfig

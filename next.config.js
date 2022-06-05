/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  publicRuntimeConfig: {
    backendUrl: process.env.DB_HOST,
  },
}

module.exports = nextConfig

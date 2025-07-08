/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    ENCRYPTED_KEY: process.env.ENCRYPTED_KEY || 'default-encrypted-key',
    BACKEND_API: process.env.BACKEND_API || 'http://localhost:3000/api',
  },
}

export default nextConfig

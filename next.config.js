/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://localhost:3000/auth/:path*',
      },
      {
        source: '/leads/:path*',
        destination: 'http://localhost:3000/leads/:path*',
      },
    ]
  },
}

module.exports = nextConfig

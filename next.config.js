/** @type {import('next').NextConfig} */
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

// Try to load backend .env to discover its port dynamically
const backendEnvPath = path.resolve(__dirname, '../crm-backend/.env')
if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath })
}

// Common env var names used for backend port
const BACKEND_PORT =
  process.env.BACKEND_PORT ||
  process.env.API_PORT ||
  process.env.SERVER_PORT ||
  process.env.PORT ||
  '8081'

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_PORT: BACKEND_PORT,
  },
  async rewrites() {
    // Important: Do not rewrite app routes like /leads/* to backend.
    // API calls should use absolute backend URL via api client.
    return []
  },
}

module.exports = nextConfig

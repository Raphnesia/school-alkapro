/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['api.raphnesia.my.id', 'raphnesia.my.id'],
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Requested-With' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' }
        ]
      }
    ]
  },
  // Rewrite untuk production - tidak perlu karena kita pakai proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.raphnesia.my.id/api/v1'}/:path*`
  //     }
  //   ]
  // },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_USE_PROXY: process.env.NEXT_PUBLIC_USE_PROXY,
  }
}

module.exports = nextConfig

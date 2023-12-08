/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGODB_URL: 'mongodb://localhost:27017/exercise-full-next',
    ACCESS_TOKEN_SECRET: 'h1n0U6LHJtCZuWitwjn3oLd5qCRIgUFtemnjTrpfZLzVZ3ff0f',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cheerspublishing.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    return config
  },
}

module.exports = nextConfig

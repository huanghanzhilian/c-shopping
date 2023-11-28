/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL: "mongodb://huangblogTwo:huangblogTwo@127.0.0.1:27017/exercise-full-next",
    ACCESS_TOKEN_SECRET: "h1n0U6LHJtCZuWitwjn3oLd5qCRIgUFtemnjTrpfZLzVZ3ff0f"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.huanghanlian.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

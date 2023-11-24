/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL: "mongodb://huangblogTwo:huangblogTwo@127.0.0.1:27017/exercise-full-next",
    ACCESS_TOKEN_SECRET: "h1n0U6LHJtCZuWitwjn3oLd5qCRIgUFtemnjTrpfZLzVZ3ff0f",
    REFRESH_TOKEN_SECRET: "q5*a8Swj9u8e5Wf'Wv1fA!Pz8TQ#S2!mKAwuFz29HqLeOeJSA",
  },
}

module.exports = nextConfig

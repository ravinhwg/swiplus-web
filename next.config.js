// next.config.js
module.exports = {
  images: {
    domains: ["storage.googleapis.com"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

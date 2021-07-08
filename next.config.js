// next.config.js
module.exports = {
  images: {
    domains: ["storage.googleapis.com", "static.swiplus.com"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

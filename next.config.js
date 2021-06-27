// next.config.js
module.exports = {
  images: {
    domains: ["picsum.photos", "storage.googleapis.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

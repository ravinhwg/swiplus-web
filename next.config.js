// next.config.js
module.exports = {
  images: {
    domains: ["picsum.photos", "storage.googleapis.com"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

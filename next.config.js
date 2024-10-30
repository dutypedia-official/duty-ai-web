/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "storage.dutyai.app",
      },
    ],
  },
};

module.exports = nextConfig;

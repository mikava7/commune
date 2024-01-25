/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "frang.ge",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },

  images: {
    domains: ["picsum.photos", "as2.ftcdn.net", "t4.ftcdn.net", "t3.ftcdn.net"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.wasabisys.com'], // Add the allowed domains here
  },
};

export default nextConfig;

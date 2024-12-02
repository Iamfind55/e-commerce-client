import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/api/v1/doctors/**',
      },
      {
        protocol: 'https',
        hostname: 's3.wasabisys.com',
        pathname: '/**',
      },
    ],
  },
};
export default withNextIntl(nextConfig);


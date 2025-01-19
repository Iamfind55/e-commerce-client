import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '227_cdn.pionexprocoin.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '227_cdn.pionexprocoin.cchttps',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img-cdn.pixlr.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gratisography.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ],
  },
  // output: 'export',
};
export default withNextIntl(nextConfig);


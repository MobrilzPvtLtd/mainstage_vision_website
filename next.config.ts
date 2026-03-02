import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beheer.mainstage.vision',
      },
      {
        protocol: 'https',
        hostname: 'mainstage.vision'
      },
      {
        protocol: 'https',
        hostname: 'mainstagevision.be'
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: 'https',
        hostname: 'www.mainstage.vision'
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'mainstagevision.replit.app'
      }
    ],
  },
};

export default nextConfig;

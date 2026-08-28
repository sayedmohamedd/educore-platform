import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000", "cdn.dummyjson.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;

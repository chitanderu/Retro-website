import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.yuuki.diy",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;

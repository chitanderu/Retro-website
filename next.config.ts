import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.3.122"],
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

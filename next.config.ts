import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/hyouka",
  assetPrefix: "/hyouka",
  output: "standalone",
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

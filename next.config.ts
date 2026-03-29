import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  output: "standalone",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
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

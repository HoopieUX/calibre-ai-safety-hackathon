import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/calibre-ai-safety-hackathon",
  assetPrefix: "/calibre-ai-safety-hackathon/",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

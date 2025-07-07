import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@convex": path.resolve(__dirname, "convex")
    };
    return config;
  }
};

export default nextConfig;

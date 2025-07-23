import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ⚠️ Warnings/errors from ESLint won't fail the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

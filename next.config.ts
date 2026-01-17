import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

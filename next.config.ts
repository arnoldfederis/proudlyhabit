import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["proudlyhabit.dev", "*.proudlyhabit.dev"],
  reactCompiler: true,
  images: {
    qualities: [85],
    formats: ["image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**.proudlyhabit.com" }],
  },
};

export default nextConfig;

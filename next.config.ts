import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Дозволяємо всі зовнішні домени для зображень
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;

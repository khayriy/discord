import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**", // Corrected to match any path under `/f/`
      },
    ],
  },
};

export default nextConfig;

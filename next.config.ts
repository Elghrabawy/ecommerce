import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;

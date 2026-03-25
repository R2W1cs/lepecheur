/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img05.restaurantguru.com",
      },
      {
        protocol: "https",
        hostname: "img.restaurantguru.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;

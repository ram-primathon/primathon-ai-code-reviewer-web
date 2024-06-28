/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/github/:path*", // The source starts with '/'
  //       destination: "https://github.com/:path*", // This could be your proxy server or actual GitHub URL
  //     },
  //     {
  //       source: "/github/:path*", // The source starts with '/'
  //       destination: "https://github.com/:path*", // This could be your proxy server or actual GitHub URL
  //     },
  //   ];
  // },
};

export default nextConfig;

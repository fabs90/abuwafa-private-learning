/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false, // Set to true if you want a permanent redirect (301)
      },
    ];
  },
};

export default nextConfig;

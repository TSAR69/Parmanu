/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@react-three/drei", "three", "three/addons"],
  experimental: {},
};

module.exports = nextConfig;

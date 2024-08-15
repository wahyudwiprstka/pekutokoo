const hostnames = [
  "flowbite.com",
  "firebasestorage.googleapis.com",
  "flowbite.com",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

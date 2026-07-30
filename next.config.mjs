/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    const mediaCacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        source: "/images/:path*",
        headers: mediaCacheHeaders,
      },
      {
        source: "/videos/:path*",
        headers: mediaCacheHeaders,
      },
    ];
  },
};

export default nextConfig;

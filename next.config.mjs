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
      {
        // explicit root SVG (e.g. /whatsapp.svg)
        source: "/whatsapp.svg",
        headers: mediaCacheHeaders,
      },
      {
        // match common image and media extensions at any path
        source: "/:file*\\.(png|jpg|jpeg|webp|svg|gif)",
        headers: mediaCacheHeaders,
      },
    ];
  },
};

export default nextConfig;

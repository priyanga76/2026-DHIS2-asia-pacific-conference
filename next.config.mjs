/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` emits a fully static site in ./out that can
  // be hosted on Vercel, Netlify, S3+CDN, or any plain web server.
  output: 'export',
  trailingSlash: true,
  images: {
    // Static export has no image optimisation server; images are pre-sized on disk.
    unoptimized: true,
  },
};

export default nextConfig;

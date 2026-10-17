/** @type {import('next').NextConfig} */
const nextConfig = {
  // Belt and suspenders: tell search engines not to index any page or file (including PDFs and plan downloads).
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;

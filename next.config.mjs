/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Prisma and the libSQL driver load native binaries at runtime; leaving them
  // external keeps the server bundle able to resolve them on a serverless host.
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "@libsql/client"],
  },

  // The site loads no third-party scripts and embeds no remote images, so the
  // conservative headers cost nothing and close the obvious gaps.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Ignored over plain HTTP, so it is safe to send in development too.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

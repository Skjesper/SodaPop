/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better Three.js support
  experimental: {
    esmExternals: "loose",
  },

  // Configure webpack for Three.js
  webpack: (config, { isServer }) => {
    // Handle Three.js modules
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    // Fix for Three.js in SSR
    if (isServer) {
      config.externals.push({
        three: "three",
      });
    }

    return config;
  },

  // Image optimization for textures
  images: {
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
  },

  // Static file serving
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

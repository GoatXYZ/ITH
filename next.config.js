/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  return {
    // Hybrid mode - no output: 'export' to allow for server components and API routes
    trailingSlash: true,

    images: {
      // For hybrid mode, you might want to use the Next.js Image Optimization
      unoptimized: false,
    },

    experimental: {
      // Enable Critters only in production builds
      optimizeCss: isProd,
    },

    // Configure a sub‑directory deployment only for production
    // assetPrefix: isProd ? '/knowledge-base' : '',
    // basePath:    isProd ? '/knowledge-base' : '',
  };
};

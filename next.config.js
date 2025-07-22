/** @type {import('next').NextConfig} */
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  return {
    // Enable static export for GitHub Pages
    output: 'export',
    trailingSlash: true,

    images: {
      // GitHub Pages requires unoptimized images for static export
      unoptimized: true,
    },

    experimental: {
      // Enable Critters only in production builds
      optimizeCss: isProd,
    },

    // Configure for GitHub Pages deployment
    assetPrefix: isProd ? '/ITH' : '',
    basePath: isProd ? '/ITH' : '',
  };
};

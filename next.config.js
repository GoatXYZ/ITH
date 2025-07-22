/** @type {import('next').NextConfig} */
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  return {
    images: {
      unoptimized: true,
    },
  };
};

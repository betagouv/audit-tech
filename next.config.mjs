import {withSentryConfig} from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });
    return config;
  }
};
const { GRIST_URL, GRIST_API_KEY, GRIST_DOC_ID } = process.env;

if (!GRIST_DOC_ID || !GRIST_URL || !GRIST_API_KEY) {
  throw new Error(
    "Erreur de configuration : Assurez-vous que GRIST_DOC_ID, GRIST_URL, et GRIST_API_KEY sont bien définis dans votre fichier .env.local."
  );
}

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: process.env.SENTRY_ORG,
project: process.env.SENTRY_PROJECT,
sentryUrl: process.env.SENTRY_URL,

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
reactComponentAnnotation: {
enabled: true,
},

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});
// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  enabled: process.env.NODE_ENV !== 'development',
  environment: process.env.NODE_ENV,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1,
  profilesSampleRate: 0.5, // Profiling sample rate is relative to tracesSampleRate
  integrations: [
    // Add profiling integration to list of integrations
    nodeProfilingIntegration(),
  ],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

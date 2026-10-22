export const sanityEnv = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01',
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
};

export const isSanityConfigured = Boolean(
  sanityEnv.projectId && sanityEnv.projectId !== 'your-project-id',
);

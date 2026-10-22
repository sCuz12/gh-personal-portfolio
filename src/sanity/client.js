import { createClient } from 'next-sanity';
import { isSanityConfigured, sanityEnv } from './env';

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

export function getDraftClient() {
  if (!sanityClient || !process.env.SANITY_API_READ_TOKEN) return null;

  return sanityClient.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
    perspective: 'drafts',
    stega: {
      enabled: true,
      studioUrl: sanityEnv.studioUrl,
    },
  });
}

import { NextResponse } from 'next/server';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { sanityClient } from '../../../../src/sanity/client';

const token = process.env.SANITY_API_READ_TOKEN;
const enableDraftMode = sanityClient && token
  ? defineEnableDraftMode({ client: sanityClient.withConfig({ token }) }).GET
  : null;

export async function GET(request) {
  if (!enableDraftMode) return NextResponse.json({ error: 'Draft preview is not configured.' }, { status: 503 });
  return enableDraftMode(request);
}

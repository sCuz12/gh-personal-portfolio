import { redirect } from 'next/navigation';

export function GET() {
  redirect(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/brain');
}

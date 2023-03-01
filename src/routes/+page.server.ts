import { getInitialTracks } from '../lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const tracks = await getInitialTracks();
  return { tracks };
}) satisfies PageServerLoad;

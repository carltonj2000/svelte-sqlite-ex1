import { getInitalTracks } from '../lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const tracks = await getInitalTracks();
  return { tracks };
}) satisfies PageServerLoad;

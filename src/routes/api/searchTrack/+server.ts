import { searchTracks, getInitialTracks } from '$lib/server/db';
import type { Track } from '$lib/server/db/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
  const searchTerm = url.searchParams.get('searchTerm')?.toString();
  let tracks: Track[] = [];

  if (!searchTerm) {
    tracks = await getInitialTracks();
  } else {
    tracks = (await searchTracks(searchTerm)) ?? [];
  }
  return json(tracks);
}) satisfies RequestHandler;

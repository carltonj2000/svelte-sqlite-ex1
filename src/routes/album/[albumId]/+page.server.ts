import { getAlbum, getTracks } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const { albumId } = params;
  if (!albumId) throw error(404, 'Invalid album (1)');
  try {
    if (isNaN(parseInt(albumId))) throw error(404, 'Invalid album (2)');
  } catch (e) {
    throw error(404, 'Invalid album (3)');
  }
  const album = await getAlbum(albumId);
  if (!album) throw error(404, 'Invalid album (4)');
  const tracks = await getTracks(albumId);
  return { album, tracks };
}) satisfies PageServerLoad;

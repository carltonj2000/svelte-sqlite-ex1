import { getAlbum, getTracks, updateAlbum, deleteAlbum } from '$lib/server/db';
import { error, type Actions } from '@sveltejs/kit';
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

export const actions: Actions = {
  updateAlbumTitle: async ({ request }) => {
    const data = await request.formData();
    const title = data.get('title')?.toString()!;
    const id = parseInt(data.get('id')?.toString()!);
    if (!(id && title)) {
      throw error(404, 'Album title or id missing');
    }
    updateAlbum(title, id);
  },
  deleteAlbum: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id')?.toString()!);
    if (!id) {
      throw error(404, 'Album id missing');
    }
    deleteAlbum(id);
  }
};

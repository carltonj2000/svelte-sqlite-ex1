import Database, { type Statement } from 'better-sqlite3';
import * as fs from 'fs/promises';
import path from 'path';

import { DB_PATH } from '$env/static/private';
import type { Track, Album, AlbumTrack } from './types';

const db = new Database(DB_PATH, { verbose: console.log });

const __dirname = '/renderws/carltonData/cj2023/code/svelte/svelte-sqlite-ex1';

const getStmnt = async (sqlfn: string): Promise<Statement> => {
  const file = path.join(__dirname, 'sql', sqlfn);
  const sql = (await fs.readFile(file)).toString();
  const stmnt = db.prepare(sql);
  return stmnt;
};
export async function getInitalTracks(limit = 50) {
  const rows = (await getStmnt('tracks.sql')).all({ limit });
  return rows as Track[];
}

export async function getAlbum(albumId: string) {
  const rows = (await getStmnt('album.sql')).all({ albumId });
  return rows[0] as Album;
}

export async function getTracks(albumId: string) {
  const rows = (await getStmnt('albumTracks.sql')).all({ albumId });
  return rows as AlbumTrack[];
}

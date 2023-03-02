import Database, { type Statement } from 'better-sqlite3';
import * as fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

import { DB_PATH } from '$env/static/private';
import type { Track, Album, AlbumTrack, User } from './types';

const db = new Database(DB_PATH, { verbose: console.log });
//const db = new Database(DB_PATH);

const __dirname = '/renderws/carltonData/cj2023/code/svelte/svelte-sqlite-ex1';

const getStmnt = async (sqlfn: string): Promise<Statement> => {
  const file = path.join(__dirname, 'sql', sqlfn);
  const sql = (await fs.readFile(file)).toString();
  const stmnt = db.prepare(sql);
  return stmnt;
};
export async function getInitialTracks(limit = 50) {
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

export async function updateAlbum(title: string, id: number) {
  (await getStmnt('albumTitleUpdate.sql')).run({ title, id });
}

export async function deleteAlbum(id: number) {
  console.log('simulate delete on db from', id);
}

export async function searchTracks(searchTerm: string, limit = 50) {
  const rows = (await getStmnt('searchTracks.sql')).all({ searchTerm, limit });
  return rows as Track[];
}

export async function insertUser(username: string, password: string) {
  const hashedPassword: string = await bcrypt.hash(password, 12);
  (await getStmnt('insertUser.sql')).run({
    username,
    password: hashedPassword
  });
}

export async function checkUser(username: string, password: string) {
  const result = (await getStmnt('getUserPassword.sql')).get({ username });
  if (result) return bcrypt.compare(password, result.password);
  await bcrypt.hash(password, 12); // create a similar delay as a valid user
  return false;
}

export async function getUserRoles(username: string) {
  const result = (await getStmnt('getUserRoles.sql')).get({ username });
  if (result) return result.roles.split(':');
  return [];
}

import { randomBytes } from 'node:crypto';
import { getUserRoles } from '../db';

type SessionInfo = {
  username: string;
  roles: string[];
  invalidAt: number;
};
type Sid = string;
const sessionStore = new Map<Sid, SessionInfo>();

let nextClean = Date.now() + 1000 * 60 * 60;

function clean() {
  const now = Date.now();
  for (const [sid, session] of sessionStore) {
    if (session.invalidAt < now) sessionStore.delete(sid);
  }
  nextClean = Date.now() + 1000 * 60 * 60;
}
function getSid(): Sid {
  return randomBytes(32).toString('hex');
}

let timer: NodeJS.Timeout;

export async function createSession(
  username: string,
  maxAge: number
): Promise<string> {
  let sid = '';
  do {
    sid = getSid();
  } while (sessionStore.has(sid));

  const roles = await getUserRoles(username);

  sessionStore.set(sid, {
    username,
    roles,
    invalidAt: Date.now() + maxAge * 1000
  });

  if (Date.now() > nextClean) {
    clearTimeout(timer);
    timer = setTimeout(clean, 500);
  }

  return sid;
}

export function getSession(sid: Sid): SessionInfo | undefined {
  const session = sessionStore.get(sid);
  if (!session) return undefined;
  if (Date.now() < session.invalidAt) return session;
  sessionStore.delete(sid);
  return undefined;
}

export function deleteSession(sid: Sid) {
  sessionStore.delete(sid);
}

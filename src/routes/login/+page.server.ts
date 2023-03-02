import { checkUser, insertUser } from '$lib/server/db';
import { createSession } from '$lib/server/sessionStore';
import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';

async function performLogin(cookies: Cookies, username: string) {
  const maxAge = 60 * 60 * 24 * 30; // expires in 30 days
  const sid = await createSession(username, maxAge);
  cookies.set('sid', sid, { maxAge });
}

export const actions: Actions = {
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    if (username && password) {
      await insertUser(username, password);
      await performLogin(cookies, username);
      throw redirect(303, '/');
    } else {
      return fail(404, {
        errorMessage: 'Require username and password for registration'
      });
    }
  },
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    if (username && password) {
      const valid = await checkUser(username, password);
      if (!valid)
        return fail(401, { errorMessage: 'Invalid username or password' });
      await performLogin(cookies, username);
      throw redirect(303, '/');
    } else {
      return fail(404, {
        errorMessage: 'Require username and password for login'
      });
    }
  }
};

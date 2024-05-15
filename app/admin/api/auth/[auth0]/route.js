import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: process.env.HOST_NAME + '/admin/success',
  }),
  logout: handleLogout({
    returnTo: process.env.HOST_NAME + '/admin',
  }),
});

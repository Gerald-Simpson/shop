import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    async login(req: any, res: any) {
        await handleLogin(req, res, {
            returnTo: process.env.HOST_NAME + '/admin/successful',
        });
    },
});

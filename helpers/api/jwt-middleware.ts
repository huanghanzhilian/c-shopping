import { NextRequest } from 'next/server';

import { auth } from '_helpers/server';

export { jwtMiddleware };

async function jwtMiddleware(req: NextRequest) {
    if (isPublicPath(req))
        return;

    // verify token in request cookie
    const id = auth.verifyToken();
    req.headers.set('userId', id);
}

function isPublicPath(req: NextRequest) {
    // public routes that don't require authentication
    const publicPaths = [
        'POST:/api/account/login',
        'POST:/api/account/logout',
        'POST:/api/account/register'
    ];
    return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}
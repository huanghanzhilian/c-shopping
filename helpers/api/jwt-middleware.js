import { auth } from '../';

export { jwtMiddleware };

async function jwtMiddleware(req, isJwt = false) {
    if (isPublicPath(req)) return;

    const id = auth.verifyToken(req, isJwt);
    req.headers.set('userId', id);
}

function isPublicPath(req) {
    // public routes that don't require authentication
    const publicPaths = [
        'POST:/api/auth/login',
        'POST:/api/auth/logout',
        'POST:/api/auth/register'
    ];
    return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}
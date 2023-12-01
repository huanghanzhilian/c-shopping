import { NextRequest, NextResponse } from 'next/server';

import { errorHandler, jwtMiddleware, validateMiddleware, identityMiddleware } from '.';

export { apiHandler };

function apiHandler(handler, { identity, schema } = {}) {
    return async (req, ...args) => {
        try {
            // monkey patch req.json() because it can only be called once
            const json = await req.json();
            req.json = () => json;
        } catch {}

        try {
            // global middleware
            await jwtMiddleware(req);
            await identityMiddleware(req, identity);
            await validateMiddleware(req, schema);

            // route handler
            const responseBody = await handler(req, ...args);
            return NextResponse.json(responseBody || {});
        } catch (err) {
            console.log('global error handler', err)
            // global error handler
            return errorHandler(err);
        }
    }
}
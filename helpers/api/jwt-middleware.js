import { auth } from '../'

export { jwtMiddleware }

async function jwtMiddleware(req, isJwt = false) {
  const id = auth.verifyToken(req, isJwt)
  req.headers.set('userId', id)
}

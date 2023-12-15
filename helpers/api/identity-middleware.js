import { usersRepo } from '../db-repo'

async function identityMiddleware(req, identity = 'user', isJwt = false) {
  if (identity === 'user' && isJwt === false) return

  const userId = req.headers.get('userId')
  const user = await usersRepo.getOne({ _id: userId })
  req.headers.set('userRole', user.role)
  req.headers.set('userRoot', user.root)

  if (identity === 'admin' && user.role !== 'admin') {
    throw '无权操作'
  }

  if (identity === 'root' && !user.root) {
    throw '无权操作，仅超级管理可操作'
  }
}

export { identityMiddleware }

import joi from 'joi'

import User from 'models/User'
import { db } from 'helpers'

async function identityMiddleware(req, identity = 'user', isJwt = false) {
  if (identity === 'user' && isJwt === false) return

  const userId = req.headers.get('userId')
  await db.connect()
  const user = await User.findOne({ _id: userId })
  await db.disconnect()
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

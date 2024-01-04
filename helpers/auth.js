import jwt from 'jsonwebtoken'
const verifyToken = async (req, isJwt) => {
  try {
    const token = req.headers.get('authorization')
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
    const id = decoded.id
    return id
  } catch (error) {
    if (isJwt) {
      throw error
    }
  }
}

const createAccessToken = payload => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  })
}

export const auth = {
  verifyToken,
  createAccessToken,
}

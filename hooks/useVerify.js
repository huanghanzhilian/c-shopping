import { useSelector } from 'react-redux'
import jwt from 'jsonwebtoken'

export default function useVerify() {
  const { token } = useSelector((state) => state.auth)
  let status

  if (!token) return false

  jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) status = false
      if (decoded) status = true
    }
  )

  if (status) return true
  else return false
}

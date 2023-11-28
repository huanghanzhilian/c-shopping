import jwt from "jsonwebtoken";

export default function verifyToken(token) {
  let status = true;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) status = false;
  });
  return status;
}

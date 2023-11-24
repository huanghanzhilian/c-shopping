import sendError from "utils/sendError";
import jwt from "jsonwebtoken";
import Users from "models/User";
import db from "lib/db";

export default async function auth(req) {
  const token = req.headers.authorization;

  if (!token) sendError(400, "对身份选择的信心是不可能的");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) sendError(400, "对身份选择的信心是不可能的");

  db.connect();
  const user = await Users.findOne({ _id: decoded.id });
  db.disconnect();

  return { id: user._id, role: user.role, root: user.root };
}

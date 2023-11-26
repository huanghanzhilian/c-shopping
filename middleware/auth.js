import { NextResponse } from 'next/server'

import sendError from "utils/sendError";
import jwt from "jsonwebtoken";
import Users from "models/User";
import db from "lib/db";

export default function auth(handler) {
  return async (req, context) => {
    try {
      const method = req.method.toLowerCase();
      const basicAuth = req.headers.get('authorization');
      if (!basicAuth) return sendError(400, "authorization 缺失！");
      const token = basicAuth.split(' ')[1];
      if (!token) return sendError(400, "token 缺失！");
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded) sendError(400, "token 无效！");
      db.connect();
      const user = await Users.findOne({ _id: decoded.id });
      db.disconnect();
      if (user.role !== "admin") return sendError(400, "无权操作");
      req.headers.set('userInfo', { id: user._id, role: user.role, root: user.root });
      // return NextResponse.json({ msg: "成功", data: { id: user._id, role: user.role, root: user.root } }, { status: 201 });
      // return { id: user._id, role: user.role, root: user.root };
      return handler.apply(null, [req, context]);
    } catch(error) {
      console.log('error', error)
      return sendError(500, error.message);
    }
  }



  
}

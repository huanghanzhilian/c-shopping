import { NextResponse } from 'next/server'

import sendError from "utils/sendError";
import jwt from "jsonwebtoken";
import User from "models/User";
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
      const user = await User.findOne({ _id: decoded.id });
      db.disconnect();

      req.headers.set('userId', user._id);
      req.headers.set('userRole', user.role);
      req.headers.set('userRoot', user.root);

      return handler.apply(null, [req, context]);
    } catch(error) {
      console.log('error', error)
      return sendError(500, error.message);
    }
  }



  
}

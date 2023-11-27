import { NextResponse } from 'next/server'
import bcrypt from "bcrypt";

import db from "lib/db";
import Users from "models/User";
import sendError from "utils/sendError";
import { createAccessToken, createRefreshToken } from "utils/generateToken";

export async function POST (req, { params }) {
  try {

    await await db.connect();
    const { name, email, password } = await req.json();

    const user = await Users.findOne({ email });

    if (user) return sendError(400, "该账户已存在");

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new Users({ name, email, password: hashPassword });
    await newUser.save();
    await db.disconnect();

    const access_token = createAccessToken({ id: newUser._id });
    const refresh_token = createRefreshToken({ id: newUser._id });

    return NextResponse.json({
      meg: "注册成功",
      data: {
        refresh_token,
        access_token,
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          root: newUser.root,
        },
      }
    }, {
      status: 201
    });

  } catch (error) {
    return sendError(500, error.message);
  }
}

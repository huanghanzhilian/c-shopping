import { NextResponse } from 'next/server'
import bcrypt from "bcrypt";

import db from "lib/db";
import Users from "models/User";
import sendError from "utils/sendError";
import { createAccessToken } from "utils/generateToken";

const login = async (req) => {
  try {
    await db.connect();
    const { email, password } = await req.json();

    const user = await Users.findOne({ email });

    if (!user) return sendError(400, "找不到此电子邮件的应用程序");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return sendError(400, "电子邮件地址或密码不正确");

    const access_token = createAccessToken({ id: user._id });

    return NextResponse.json({
      msg: "登录成功",
      data: {
        access_token,
        user: {
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          root: user.root,
        },
      }
    }, { status: 200 })
  } catch (error) {
    return sendError(500, error.message);
  }
}

export const POST = login;

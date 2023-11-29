import { NextResponse } from 'next/server'
import bcrypt from "bcrypt";

import db from "lib/db";
import Users from "models/User";
import sendError from "utils/sendError";
import { createAccessToken } from "utils/generateToken"; 

const register = async (req, { params }) => {
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

    return NextResponse.json({
      meg: "注册成功",
      data: {
        access_token,
        user: {
          name: newUser.name,
          email: newUser.email,
          mobile: newUser.mobile,
          address: newUser.address,
          role: newUser.role,
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

export const POST = register;

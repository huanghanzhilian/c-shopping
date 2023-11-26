import { NextResponse } from "next/server";

import db from "lib/db";
import User from "models/User";
import auth from "middleware/auth";
import sendError from "utils/sendError";
import bcrypt from "bcrypt";


const resetPassword = auth(async (req, res) => {
  try {
    const userId = req.headers.get('userId');
    const { password } = await req.json();

    const hashPassword = await bcrypt.hash(password, 12);

    await db.connect();
    await User.findOneAndUpdate({ _id: userId }, { password: hashPassword });
    await db.disconnect();

    return NextResponse.json({
      msg: "密码更新成功"
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

export const PATCH = resetPassword;

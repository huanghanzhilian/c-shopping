import { NextResponse } from "next/server";

import db from "lib/db";
import User from "models/User";
import auth from "middleware/auth";
import sendError from "utils/sendError";


const uploadInfo = auth(async (req) => {
  try {
    const userId = req.headers.get('userId');
    const { name, avatar } = await req.json();
    const userInfo = await User.findOne({ _id: userId });

    await db.connect();
    const newUser = await User.findByIdAndUpdate(
      { _id: userInfo._id },
      { name, avatar }
    );
    await db.disconnect();

    return NextResponse.json({
      msg: "已成功更新用户信息",
      user: { name, avatar, email: newUser.email, role: newUser.role },
    }, {
      status: 201
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

const getUsers = auth(async (req) => {
  try {
    
    const role = req.headers.get('userRole');
    if (role !== "admin") return sendError(400, "无权操作");

    await db.connect();
    const users = await User.find().select("-password");
    await db.disconnect();
    
    return NextResponse.json({
      users
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

export const PATCH = uploadInfo;
export const GET = getUsers;

import { NextResponse } from "next/server";

import db from "lib/db";
import User from "models/User";
import auth from "middleware/auth";
import sendError from "utils/sendError";


const uploadInfo = auth(async (req) => {
  try {
    const userId = req.headers.get('userId');
    const result = await req.json();
    if (!result) return sendError(400, "请提交数据");

    await db.connect();
    await User.findByIdAndUpdate(
      { _id: userId },
      { ...result }
    );
    const newUser = await User.findOne({ _id: userId });
    await db.disconnect();

    return NextResponse.json({
      msg: "已成功更新用户信息",
      user: {
        name: newUser.name,
        mobile: newUser.mobile,
        email: newUser.email,
        address: newUser.address,
        role: newUser.role,
        root: newUser.root,
      }
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

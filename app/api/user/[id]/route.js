import { NextResponse } from "next/server";

import db from "lib/db";
import User from "models/User";
import auth from "middleware/auth";
import sendError from "utils/sendError";


const updateRole = auth(async (req, { params }) => {
  try {

    const { id } = params;
    const { role } = await req.json();

    const userRole = req.headers.get('userRole');
    if (userRole !== "admin") return sendError(400, "无权操作");

    await db.connect();
    await User.findOneAndUpdate({ _id: id }, { role });
    await db.disconnect();

    return NextResponse.json({
      msg: "用户信息已成功更新"
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

const deleteUser = auth(async (req, { params }) => {
  try {

    const { id } = params;

    const role = req.headers.get('userRole');
    const userRoot = req.headers.get('userRoot');
    if (role !== "admin" || !userRoot) return sendError(400, "无权操作");

    await db.connect();
    await User.findByIdAndDelete( id );
    await db.disconnect();

    return NextResponse.json({
      msg: "用户信息已经删除"
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

export const PATCH = updateRole;
export const DELETE = deleteUser;

import { NextResponse } from 'next/server'

import db from "lib/db";
import User from "models/User";
import sendError from "utils/sendError";
import auth from "middleware/auth";

const getUertInfo = auth(async (req) => {
  try {

    const userId = req.headers.get('userId');

    await db.connect();
    const user = await User.findOne({ _id: userId });
    await db.disconnect();

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        role: user.role,
        root: user.root
      },
    }, { status: 200 });

  } catch (error) {
    return sendError(500, error.message);
  }
});

export const GET = getUertInfo;

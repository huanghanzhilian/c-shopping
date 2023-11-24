import { NextResponse } from 'next/server'

import db from "lib/db";
import Users from "models/User";
import bcrypt from "bcrypt";

export async function POST (req, { params }) {
  try {

    await await db.connect();
    const { name, email, password } = await req.json();

    console.log(name, email, password)

    const user = await Users.findOne({ email });

    if (user) return NextResponse.json({ err: '该账户已存在' }, { status: 400});

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new Users({ name, email, password: hashPassword });
    
    await newUser.save();
    await db.disconnect();

    return NextResponse.json({
      meg: "注册成功"
    }, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json({
      err: error.message
    }, {
      status: 500
    });
  }
}

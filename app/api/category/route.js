import { NextResponse } from 'next/server'

import Category from "models/Category";
import auth from "middleware/auth";
import db from "lib/db";
import sendError from "utils/sendError";

const getCategory = async (req) => {
  try {
    db.connect();
    const category = await Category.find();
    db.disconnect();
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return sendError(500, error.message);
  }
}

const createCategory = auth(async(req) => {
  try {

    const { name } = await req.json();
    if (!name) return sendError(400, "分类名称不能为空");

    await db.connect();

    const category = await Category.findOne({ name });
    if (category) return sendError(400, "该分类名称已存在");

    const newCategory = new Category({ name });
    await newCategory.save();
    await db.disconnect();

    return NextResponse.json({ msg: "创建分类成功", newCategory }, { status: 201 });
  } catch (error) {
    console.log('error', error)
    return sendError(500, error.message);
  }
})

export const GET  = getCategory;
export const POST  = createCategory;

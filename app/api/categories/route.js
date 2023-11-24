import { NextResponse } from 'next/server'

import Categories from "models/Categories";
import auth from "middleware/auth";
import db from "lib/db";
import sendError from "utils/sendError";

const getCategories = async (req) => {
  try {
    db.connect();
    const categories = await Categories.find();
    db.disconnect();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return sendError(500, error.message);
  }
}

const createCategories = auth(async(req) => {
  try {

    const { name } = await req.json()
    console.log('name', name)
    if (!name) return sendError(400, "分类名称不能为空");

    await db.connect();
    const newCategory = new Categories({ name });
    await newCategory.save();
    await db.disconnect();

    return NextResponse.json({ msg: "创建分类成功", newCategory }, { status: 201 });
  } catch (error) {
    console.log('error', error)
    return sendError(500, error.message);
  }
})

console.log('getCategories', getCategories)
console.log('createCategories', createCategories)

export const GET  = getCategories;
export const POST  = createCategories;
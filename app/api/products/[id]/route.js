import { NextResponse } from "next/server";

import db from "lib/db";
import Products from "models/Products";
import auth from "middleware/auth";
import sendError from "utils/sendError";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    db.connect();
    const product = await Products.findById(id);
    db.disconnect();

    if (!product) return sendError(500, "此产品不存在");
    
    return NextResponse.json({
      product
    }, {
      status: 200
    })
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

export const PUT = auth(async (req, { params }) => {
  try {
    const { id } = params;

    const {
      title,
      price,
      inStock,
      description,
      content,
      category,
      images,
    } = await req.json();

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    ) return sendError(400, "请填写所有字段");

    await db.connect();
    await Products.findByIdAndUpdate(
      { _id: id },
      {
        title,
        price,
        inStock,
        description,
        content,
        category,
        images,
      }
    );
    await db.disconnect();

    return NextResponse.json({
      msg: "产品更新成功"
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

export const DELETE = auth(async (req, { params }) => {
  try {
    const { id } = params;

    await db.connect();
    await Products.findByIdAndDelete(id);
    await db.disconnect();
    
    return NextResponse.json({
      msg: "产品已成功删除"
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

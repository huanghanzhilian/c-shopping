import { NextResponse } from "next/server";

import Order from "models/Order";
import auth from "middleware/auth";
import db from "lib/db";
import sendError from "utils/sendError";


export const GET = auth(async (req) => {
  try {
    const userInfo = req.headers.get('userInfo');
    let orders;

    if (userInfo.role !== "admin") {
      await db.connect();
      orders = await Order.find({ user: userInfo.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Order.find().populate("user", "-password");
    }

    return NextResponse.json({
      orders
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

export const POST = auth(async (req) => {
  try {
    const userInfo = req.headers.get('userInfo');
    const { address, mobile, cart, total } = await req.json();

    await db.connect();
    const newOrder = new Order({
      user: userInfo.id,
      address,
      mobile,
      cart,
      total,
    });

    //? update product beside on new order
    // cart.forEach((item) =>
    //   sold(item._id, item.quantity, item.inStock, item.sold)
    // );

    await newOrder.save();
    await db.disconnect();

    return NextResponse.json({
      msg: "创建订单成功",
      newOrder
    }, {
      status: 200
    });
  } catch (error) {
    return sendError(500, error.message);
  }
});

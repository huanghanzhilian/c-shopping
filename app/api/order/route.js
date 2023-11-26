import { NextResponse } from "next/server";

import Order from "models/Order";
import auth from "middleware/auth";
import User from "models/User";
import db from "lib/db";
import sendError from "utils/sendError";


export const GET = auth(async (req) => {
  try {
    const userId = req.headers.get('userId');
    const role = req.headers.get('userRole');
    let orders;

    if (role !== "admin") {
      await db.connect();
      orders = await Order.find({ user: userId }).populate(
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
    const userId = req.headers.get('userId');
    const { address, mobile, cart, total } = await req.json();

    await db.connect();
    const newOrder = new Order({
      user: userId,
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

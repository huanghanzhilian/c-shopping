import joi from "joi";

import { setJson, apiHandler } from "@/helpers/api";
import { orderRepo } from "@/helpers";


const getOrders = apiHandler(async (req) => {
  const userId = req.headers.get('userId');
  const role = req.headers.get('userRole');
  const result = await orderRepo.getAll(userId, role);
  return setJson({
    data: result
  })
}, {
  isJwt: true
});


const createOrder = apiHandler(async (req) => {
  const userId = req.headers.get('userId');
  const body = await req.json();
  await orderRepo.create(userId, body);
  return setJson({
    message: '创建订单成功'
  })
}, {
  isJwt: true,
  schema: joi.object({
    address: joi.string().required(),
    mobile: joi.string().required(),
    cart: joi.array().required(),
    total: joi.number().required()
  })
});


export const GET = getOrders;
export const POST = createOrder;

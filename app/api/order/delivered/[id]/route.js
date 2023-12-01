import joi from "joi";

import { setJson, apiHandler } from "@/helpers/api";
import { orderRepo } from "@/helpers";


const deliveredOrder = apiHandler(async (req, { params }) => {
  const { id } = params;
  const body = {
    paid: true,
    dateOfPayment: new Date().toISOString(),
    method: "在线付款",
    deliverd: true,
  }
  await orderRepo.update(id, body)
  return setJson({
    message: '已经通过确认'
  })
}, {
  isJwt: true,
  identity: 'admin'
});

export const PATCH = deliveredOrder;
